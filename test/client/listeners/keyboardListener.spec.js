import React from 'react';
import { render, unmount } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Room from "../../../src/client/pages/_room/Room"
import { TestAppAlertProviderWithAlerts } from "../helpers/alertContext";
import { TestAppRoomsProviderWithRooms } from "../helpers/roomsContext";
import { TestAppSocketProviderWithSocketClient } from "../helpers/socketContext";
import { TestAppUserProviderWithPlayer } from "../helpers/userContext";
import { uuid_1 } from '../helpers/data';


describe("Test keyboard listener", () => {
  const Wrapper = () => (
    <TestAppAlertProviderWithAlerts>
      <TestAppUserProviderWithPlayer>
        <TestAppRoomsProviderWithRooms>
          <TestAppSocketProviderWithSocketClient>
            <Router>
              <Room match={ {params: uuid_1}} />
            </Router>
          </TestAppSocketProviderWithSocketClient>
        </TestAppRoomsProviderWithRooms>
      </TestAppUserProviderWithPlayer>
    </TestAppAlertProviderWithAlerts>
  );

  test("Test removed listener", () => {
    render(<Wrapper />);
    expect(window.addEventListener).toBeCalled();
    unmount()
    expect(window.removeEventListener).toBeCalled();
  })

})