import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
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
            <Router initialEntries={[ `/room/${uuid_1}` ]} />
          </TestAppSocketProviderWithSocketClient>
        </TestAppRoomsProviderWithRooms>
      </TestAppUserProviderWithPlayer>
    </TestAppAlertProviderWithAlerts>
  );

  test("Test removed listener", () => {
    const wr = render(<Wrapper />);
    window.removeEventListener = jest.fn();
    wr.unmount()
    expect(window.removeEventListener).toBeCalled();
  })

})