import React, { useContext, useEffect } from "react";
import { act } from 'react-dom/test-utils';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react'
import HomePage from "../../../../src/client/pages/home/Home"
import { TestAppAlertProvider } from "../../helpers/alertContext";
import { TestAppRoomsProvider } from "../../helpers/roomsContext";
import { TestAppSocketProvider } from "../../helpers/socketContext";
import { TestAppUserProvider } from "../../helpers/userContext";
import { describe, expect, test } from "@jest/globals";

// Enzyme.configure({ adapter: new Adapter() });

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
  
  test("Test login input", () => {
    const { getByTestId } = render(<Wrapper />);
    const input_login = getByTestId('loginInput');
    expect(input_login).toBeEmptyDOMElement('');
    fireEvent.change(input_login, { target: { value: 'abcd' } });
    expect(input_login).toHaveValue('abcd');
  })

  test("Test buttons disabled", () => {
    const { container, getByTestId } = render(<Wrapper />);
    const input_login = getByTestId('loginInput');
    const btn_create_room = container.querySelector('.test--btn-create-room')

    expect(btn_create_room).toBeDisabled();
    fireEvent.change(input_login, { target: { value: 'abcd' } });
    expect(btn_create_room).not.toBeDisabled();
  })

  test("Test if we can't join a room without rooms created", () => {
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