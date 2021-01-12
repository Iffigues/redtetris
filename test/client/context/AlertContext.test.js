import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Context as AlertContext } from "../../../src/client/context/AlertContext";
import { TestAppAlertProvider } from "../helpers/alertContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("Test Alert context", () => {
  test("Test sendAlert function", () => {
    let contextValue;
    const AlertSenderComp = () => {
      const { sendAlert, state } = useContext(AlertContext);
      contextValue = state;
      useEffect(() => {
        sendAlert('It\'s little test', 'info');
      }, [])
      return null;
    };
    const Wrapper = () => (
      <TestAppAlertProvider>
        <AlertSenderComp />
      </TestAppAlertProvider>
    );
    mount(<Wrapper />);
    expect(contextValue.message).toBe('It\'s little test');
    expect(contextValue.type).toBe('info');
  })
})