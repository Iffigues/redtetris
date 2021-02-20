import { MemoryRouter as Router, Route } from 'react-router-dom';
import { uuid_1, visitor_player, rooms_1 } from '../../helpers/data';
import React, { useContext, useEffect } from "react";
import Enzyme, { shallow } from "enzyme";
import { render } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import Room from '../../../../src/client/pages/_room/Room'
import { TestAppAlertProvider } from "../../helpers/alertContext";
import { TestAppRoomsProvider } from "../../helpers/roomsContext";
import { TestAppSocketProvider } from "../../helpers/socketContext";
import { TestAppUserProvider } from "../../helpers/userContext";
import { describe, expect, test } from "@jest/globals";
import { Context as RoomsContext } from "../../../../src/client/context/RoomsContext";
import { Context as UserContext } from "../../../../src/client/context/UserContext";

Enzyme.configure({ adapter: new Adapter() });

describe("Test Room", () => {

  test("can shallow", () => {
    const CurrentRoomsSetter = ({ children }) => {
      const { updateRooms } = useContext(RoomsContext);
      useEffect(() => {
        updateRooms(rooms_1);
      }, []);
      return <>{children}</>;
    };
    const Wrapper = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
            <TestAppSocketProvider>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <Router initialEntries={[ `/room/${uuid_1}` ]}>
                  <Route path='/room/:uuidRoom' render={(props) => {
                    return ( <Room {...props } /> )
                  }} />
                </Router>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
            </TestAppSocketProvider>
        </TestAppUserProvider>
      </TestAppAlertProvider>
    );

  
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).not.toBeNull()
  })

  test("Test login input", () => {
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

    const mountWithRouter = node => render(<Router>{node}</Router>);

    const Wrapper = () => (
      <TestAppAlertProvider>
        <TestAppUserProvider>
          <CurrentPlayerSetter>
            <TestAppRoomsProvider>
              <CurrentRoomsSetter>
                <TestAppSocketProvider>
                  <Room />
                </TestAppSocketProvider>
              </CurrentRoomsSetter>
            </TestAppRoomsProvider>
          </CurrentPlayerSetter>
        </TestAppUserProvider>
      </TestAppAlertProvider>
  );

    const wrapper = mountWithRouter(<Wrapper />);
    expect(wrapper).not.toBeNull()
  })
})