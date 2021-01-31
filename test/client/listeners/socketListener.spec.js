import React,  { useContext } from 'react';
import io, { serverSocket, cleanUp } from 'socket.io-client';
import { render, fireEvent } from '@testing-library/react';
import HomePage from "../../../src/client/pages/home/Home"
import { rooms_1, rooms_2 } from "../helpers/data";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import { TestAppAlertProvider } from "../helpers/alertContext";
import { TestAppRoomsProvider } from "../helpers/roomsContext";
import { TestAppSocketProvider } from "../helpers/socketContext";
import { TestAppUserProvider } from "../helpers/userContext";

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

describe("Test sockets listener", () => {
  const rooms = jest.fn();
  const Wrapper = () => (
    <TestAppAlertProvider>
      <TestAppUserProvider>
        <TestAppRoomsProvider value={{ rooms }}>
          <TestAppSocketProvider>
            <HomePage />
          </TestAppSocketProvider>
        </TestAppRoomsProvider>
      </TestAppUserProvider>
    </TestAppAlertProvider>
  );

  test("Test ping work", () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);
    render(<Wrapper />);
    expect(mockSocket.emit).toHaveBeenCalledTimes(1)
  })

  test("Test client/update-rooms", () => {
    const ENDPOINT = 'localhost:3004';
    const mockSocket = io(ENDPOINT);
    render(<Wrapper />);
    mockSocket.emit('client/update-rooms', { _data: rooms_2 });
    expect(mockSocket.emit).toHaveBeenCalledTimes(3)
  })

})