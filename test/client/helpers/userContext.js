import React, { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import { players_1, rooms } from "../helpers/data";
import Adapter from "enzyme-adapter-react-16";
import { Provider as UserProvider } from "../../../src/client/context/UserContext";
import { Context as UserContext } from "../../../src/client/context/UserContext";

Enzyme.configure({ adapter: new Adapter() });

export const TestAppUserProvider = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

export const TestAppUserProviderWithThreeRooms = ({ children }) => (
  <TestAppUserProvider>
    <CurrentUserSetter>{children}</CurrentUserSetter>
  </TestAppUserProvider>
);

const CurrentUserSetter = ({ children }) => {
  const { updateUuidRoom,  updatePlayer } = useContext(UserContext);
  useEffect(() => {
    updateUuidRoom(rooms[0].channel);
    updatePlayer(players_1[0]);
  }, []);
  return <>{children}</>;
};
