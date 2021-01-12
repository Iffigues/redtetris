import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import { rooms_1 } from "../helpers/data";
import Adapter from "enzyme-adapter-react-16";
import { Provider as RoomsProvider } from "../../../src/client/context/RoomsContext";
import { Context as RoomsContext } from "../../../src/client/context/RoomsContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppRoomsProvider = ({ children }) => (
  <RoomsProvider>{children}</RoomsProvider>
);

export const TestAppRoomsProviderWithRooms = ({ children }) => (
  <TestAppRoomsProvider>
    <CurrentRoomsSetter>{children}</CurrentRoomsSetter>
  </TestAppRoomsProvider>
);

const CurrentRoomsSetter = ({ children }) => {
  const { updateRooms } = useContext(RoomsContext);
  console.log(rooms_1)
  useEffect(() => {
    updateRooms(rooms_1);
  }, []);
  console.log("children", children)
  return <>{children}</>;
};
