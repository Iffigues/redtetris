import React from 'react';
import { render, unmount } from '@testing-library/react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { TestAppAlertProviderWithAlerts } from "../../helpers/alertContext";
import { TestAppRoomsProviderWithRooms } from "../../helpers/roomsContext";
import { TestAppSocketProviderWithSocketClient } from "../../helpers/socketContext";
import { TestAppUserProviderWithPlayer } from "../../helpers/userContext";
import { uuid_1 } from '../../helpers/data';
import Room from '../../../../src/client/pages/_room/Room'


describe("Test keyboard listener", () => {
  const Wrapper = () => (
    <TestAppAlertProviderWithAlerts>
      <TestAppUserProviderWithPlayer>
        <TestAppRoomsProviderWithRooms>
          <TestAppSocketProviderWithSocketClient>
            <Router initialEntries={[ `/room/${uuid_1}` ]}>
              <Route path='/room/:uuidRoom' render={(props) => {
                return ( <Room {...props } /> )
              }} />
            </Router>
          </TestAppSocketProviderWithSocketClient>
        </TestAppRoomsProviderWithRooms>
      </TestAppUserProviderWithPlayer>
    </TestAppAlertProviderWithAlerts>
  );

  test("Test if game grid show", () => {
    // 'gameElmt'
    const { getByTestId } = render(<Wrapper />);
    const gameElmt = getByTestId('gameElmt');
    expect(gameElmt).not.toBeNull();
  })

})