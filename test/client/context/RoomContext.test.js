import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { rooms_2 } from "../helpers/data";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";
import { TestAppRoomsProvider } from "../helpers/RoomsContext";
import { describe, expect, test } from "@jest/globals";

Enzyme.configure({ adapter: new Adapter() });

describe("Test RoomContext", () => {
  test("Test updateRooms function", () => {
    let contextValue;
    const RoomsUpdaterComp = () => {
      const { updateRooms, state } = useContext(RoomsContext);
      contextValue = state;
      useEffect(() => {
        updateRooms({ _data: rooms_2 });
      }, [])
      return null;
    };
    const Wrapper = () => (
      <TestAppRoomsProvider>
        <RoomsUpdaterComp />
      </TestAppRoomsProvider>
    );
    mount(<Wrapper />);
    expect(contextValue.rooms).toBe(rooms_2);
  })
})