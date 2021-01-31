import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Board from '../../../src/client/components/board'
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { TestAppUserProvider } from "../helpers/userContext";
import { player_instance, room_instance, visitor_player } from '../helpers/data'

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
      console.log(667, updatePlayer)
      useEffect(() => {
        updatePlayer(visitor_player);
      }, [])
      return <>{children}</>;
    };
    const Wr = () => (
      <TestAppUserProvider>
        <CurrentPlayerSetter>
          <Board
            mapGame={room_instance.players[player_instance.uuid].currentMapGame}
            mapGamePreview={room_instance.players[player_instance.uuid].currentMapGame}
            isAlone={true}
            score={10}
            sheet={room_instance.players[player_instance.uuid].sheets[0]}
          />
        </CurrentPlayerSetter>
      </TestAppUserProvider>
    )
    mount(<Wr />);
  })

});
