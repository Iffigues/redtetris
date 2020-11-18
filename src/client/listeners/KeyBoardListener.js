import { useEffect, useContext } from 'react';
import { SocketContext } from "../context/SocketContext";
import { Context as UserContext } from "../context/UserContext";

export default (isGame) => {
  const { sendSocket } = useContext(SocketContext);
  const { state: { uuidRoom } } = useContext(UserContext);
  const keysCode = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'];

  useEffect(() => {
    const getKeyUp = (event) => {
      const { key } = event;
      console.log('key[', key, ']');
      if (keysCode.includes(key)) {
        if (key === 'Escape') {
          sendSocket('server/pause-resume', { channel: uuidRoom })
        } else {
          console.log('key', key);
          sendSocket('server/key-up', { key, channel: uuidRoom })
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