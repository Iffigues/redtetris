import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react'
import HomePage from "../../../../src/client/pages/home/Home"
import { TestAppAlertProvider } from "../../helpers/alertContext";
import { TestAppRoomsProvider } from "../../helpers/roomsContext";
import { TestAppSocketProvider } from "../../helpers/socketContext";
import { TestAppUserProvider } from "../../helpers/userContext";
import { describe, expect } from "@jest/globals";

describe("Test HomePage", () => {

  const Wrapper = () => (
    <TestAppAlertProvider>
      <TestAppUserProvider>
        <TestAppRoomsProvider>
          <TestAppSocketProvider>
            <HomePage />
          </TestAppSocketProvider>
        </TestAppRoomsProvider>
      </TestAppUserProvider>
    </TestAppAlertProvider>
  );
  
  it("Test login input", () => {
    const { getByTestId } = render(<Wrapper />);
    const input_login = getByTestId('loginInput');
    expect(input_login).toBeEmptyDOMElement('');
    fireEvent.change(input_login, { target: { value: 'abcd' } });
    expect(input_login).toHaveValue('abcd');
  })

  it("Test buttons disabled", () => {
    const { container, getByTestId } = render(<Wrapper />);
    const input_login = getByTestId('loginInput');
    const btn_create_room = container.querySelector('.test--btn-create-room')

    expect(btn_create_room).toBeDisabled();
    fireEvent.change(input_login, { target: { value: 'abcd' } });
    expect(btn_create_room).not.toBeDisabled();
  })

  it("Test if we can't join a room without rooms created", () => {
    const { getByTestId, queryByText } = render(<Wrapper />);
    const msg_no_rooms = "Aucune partie n'est disponible pour le moment"
    const input_login = getByTestId('loginInput');
    const btn_join_room = getByTestId('btnJoinRoom')

    expect(btn_join_room).toBeDisabled();
    expect(queryByText(msg_no_rooms)).toBeNull()
    fireEvent.change(input_login, { target: { value: 'abcd' } });
    expect(btn_join_room).not.toBeDisabled();
    fireEvent.click(btn_join_room)
    expect(queryByText(msg_no_rooms)).not.toBeNull()
  })

})