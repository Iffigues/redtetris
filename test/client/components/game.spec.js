import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import Game from '../../../src/client/components/game'
import { player_instance, room_instance } from "../helpers/data";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe('Alert component', () => {

  const Wrapper = () => (
    <Game />
  )

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Can mount', () => {
    const Wr = () => (
      <Game
        game={
          {
              game: room_instance.players[player_instance.uuid].currentMapGame,
              isOtherUser: false
          }
        }
      />
    )
    const w = mount(<Wr />);
    expect(w).not.toBeNull()
  })

});