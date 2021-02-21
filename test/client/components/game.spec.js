import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import Game from '../../../src/client/components/game'
import { render } from '@testing-library/react'
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
        game={room_instance.players[player_instance.uuid].currentMapGame}
        song={false}
        isOtherUser={false}
      />
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })

});