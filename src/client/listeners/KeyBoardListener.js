import { useEffect, useContext } from 'react';
import Player from '../../server/class/tetris/Player';
import { SocketContext } from "../context/SocketContext";
import { Context as UserContext } from "../context/UserContext";

export default (isGame) => {
  const { sendSocket } = useContext(SocketContext);
  const { state: { uuidRoom, player } } = useContext(UserContext);
  const keysCode = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Escape'];

  useEffect(() => {
    const getKeyUp = (event) => {
      const { key } = event;
      if (keysCode.includes(key)) {
        if (key === 'Escape') {
          sendSocket('server/pause-resume', { channel: uuidRoom })
        } else {
          sendSocket('server/key-up', { key, channel: uuidRoom, uuidUser: player.uuid  })
        }
      }
    }
    if (isGame) {
      document.addEventListener('keyup', getKeyUp);
    }
    return () => {
      document.removeEventListener('keyup', getKeyUp);
    };
  }, [isGame])
}