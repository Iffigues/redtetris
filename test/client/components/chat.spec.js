import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import Chat from '../../../src/client/components/Chat'
import { render, fireEvent } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import { player_instance, room_instance, visitor_player, rooms_1 } from '../helpers/data'
import { TestAppSocketProvider } from "../helpers/socketContext";
import { TestAppUserProvider } from "../helpers/userContext";
import { TestAppRoomsProvider } from "../helpers/roomsContext";
import { Context as UserContext } from "../../../src/client/context/UserContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";


Enzyme.configure({ adapter: new Adapter() });
describe('Chat component', () => {

  const Wrapper = () => (
    <Chat />
  )

  it('Is exists', () => {
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
                <Chat
                  uuidRoom={rooms_1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })

  test('Test button message', () => {
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
                <Chat
                  uuidRoom={rooms_1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container, getByTestId } = render(<Wr />);
    const input_messsage = getByTestId('messageChat');
    const button_submit = container.querySelector('.test--btn-submit-message')

    expect(button_submit).toBeDisabled();
    fireEvent.change(input_messsage, { target: { value: 'abcd' } });
    expect(button_submit).not.toBeDisabled();
  })

  test('Send message', () => {
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
                <Chat
                  uuidRoom={rooms_1.channel}
                  />
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppSocketProvider>
    )
    const { container, getByTestId } = render(<Wr />);
    const input_messsage = getByTestId('messageChat');
    const button_submit = container.querySelector('.test--btn-submit-message')
    
    fireEvent.change(input_messsage, { target: { value: 'abcd' } });
    fireEvent.click(button_submit)
  })

});