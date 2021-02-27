import React, { useContext, useEffect } from "react";
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Board from '../../../src/client/components/board'
import { render } from '@testing-library/react'
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import { TestAppUserProvider } from "../helpers/userContext";
import { player_instance, room_instance, visitor_player, rooms_1, player_visitor_instance } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/socketContext";
import { TestAppRoomsProvider } from "../helpers/roomsContext";


Enzyme.configure({ adapter: new Adapter() });
describe('Board component', () => {
  test('Is exists', () => {
    const CurrentUserSetter = ({ children }) => {
      const { updateUuidRoom, updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updateUuidRoom("112233445566778899");
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };

    const Wrapper = () => (
      <CurrentUserSetter>
        <Board />
      </CurrentUserSetter>
    )
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Can mount', () => {
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };

    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_1);
      }, []);
      return <>{children}</>;
    };

    const Wr = () => (
      <TestAppSocketProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <Board
                  song={false}
                  currentRoom={room_instance}
                  isEnd={room_instance.players[player_instance.uuid].end}
                  mapGame={room_instance.players[player_instance.uuid].currentMapGame}
                  isAlone={Object.keys(room_instance.players).length === 1}
                  mapsGamePreview={_.filter(room_instance.players, item => item.uuid !== player_instance.uuid && !item.visitor)}
                  score={room_instance.players[player_instance.uuid].score}
                  sheet={room_instance.players[player_instance.uuid].sheets[0]}
                  finalScore={room_instance.finalScore}
                  uuidRoom={room_instance.channel}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    render(<Wr />);
  })

  test('Board Visitor', () => {
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(player_visitor_instance);
      }, [])
      return <>{children}</>;
    };

    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_1);
      }, []);
      return <>{children}</>;
    };

    const Wr = () => (
      <TestAppSocketProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <Board
                  song={false}
                  currentRoom={room_instance}
                  isEnd={room_instance.players[player_visitor_instance.uuid].end}
                  mapGame={room_instance.players[player_visitor_instance.uuid].currentMapGame}
                  isAlone={Object.keys(room_instance.players).length === 1}
                  mapsGamePreview={_.filter(room_instance.players, item => item.uuid !== player_visitor_instance.uuid && !item.visitor)}
                  score={room_instance.players[player_visitor_instance.uuid].score}
                  sheet={room_instance.players[player_visitor_instance.uuid].sheets[0]}
                  finalScore={room_instance.finalScore}
                  uuidRoom={room_instance.channel}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container } = render(<Wr />);
    const container_not_visitor = container.querySelector('.test--visitor-player')
    expect(container_not_visitor).toBeNull()
  })

  test('Board Player', () => {
    const CurrentPlayerSetter = ({ children }) => {
      const { updatePlayer } = useContext(UserContext);
      useEffect(() => {
        updatePlayer(player_instance);
      }, [])
      return <>{children}</>;
    };

    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_1);
      }, []);
      return <>{children}</>;
    };

    const Wr = () => (
      <TestAppSocketProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <Board
                  song={false}
                  currentRoom={room_instance}
                  isEnd={room_instance.players[player_instance.uuid].end}
                  mapGame={room_instance.players[player_instance.uuid].currentMapGame}
                  isAlone={Object.keys(room_instance.players).length === 1}
                  mapsGamePreview={_.filter(room_instance.players, item => item.uuid !== player_instance.uuid && !item.visitor)}
                  score={room_instance.players[player_instance.uuid].score}
                  sheet={room_instance.players[player_instance.uuid].sheets[0]}
                  finalScore={room_instance.finalScore}
                  uuidRoom={room_instance.channel}
                />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container } = render(<Wr />);
    const container_not_visitor = container.querySelector('.test--player')
    expect(container_not_visitor).not.toBeNull()
  })

});
