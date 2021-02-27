import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import Chat from '../../../src/client/components/Chat'
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import { player_instance1, room1, visitor_player, rooms_1 } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/socketContext";
import { TestAppUserProvider } from "../helpers/userContext";
import { TestAppRoomsProvider } from "../helpers/roomsContext";
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import ModalResume from "../../../src/client/components/ModalResume";


Enzyme.configure({ adapter: new Adapter() });
describe('ModalResume component', () => {

  const Wrapper = () => (
    <ModalResume
      setSong={() => {}}
      isPlaying={false}
      song={false}
      player={player_instance1}
      uuidRoom={room1.channel}
    />
  )

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });


  it('Can mount', () => {
    render(<Wrapper />);
  })

  it('is not null', () => {
    const { container } = render(<Wrapper />);
    const container_modal = container.querySelector('.test--modal-resume')
    expect(container_modal).not.toBeNull()
  })

});