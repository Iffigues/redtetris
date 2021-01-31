import { MemoryRouter as Router, Route } from 'react-router-dom';
import { uuid_1, visitor_player } from '../../helpers/data';
import React, { useContext, useEffect } from "react";
import { act } from 'react-dom/test-utils';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react'
import HomePage from "../../../../src/client/pages/home/Home"
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

    const mountWithRouter = node => mount(<Router>{node}</Router>);

    const Wrapper = () => (
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
    );

    const wrapper = mountWithRouter(<Wrapper />);
    expect(wrapper).not.toBeNull()
  })
})