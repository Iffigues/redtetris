import { MemoryRouter as Router, Route } from 'react-router-dom';
import { uuid_1 } from '../../helpers/data';
import React, { useContext, useEffect } from "react";
import { act } from 'react-dom/test-utils';
import Enzyme, { shallow } from "enzyme";
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


Enzyme.configure({ adapter: new Adapter() });

describe("Test Room", () => {

  test("Test login input", () => {
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
})