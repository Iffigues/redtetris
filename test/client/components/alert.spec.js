import React, { useContext, useEffect } from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount } from "enzyme";
import { render } from '@testing-library/react'
import Adapter from "enzyme-adapter-react-16";
import Alerts from '../../../src/client/components/alerts'
import { Context as AlertContext } from "../../../src/client/context/AlertContext";
import { TestAppAlertProvider } from "../helpers/alertContext";

Enzyme.configure({ adapter: new Adapter() });

describe('Alert component', () => {

  const CurrentAlertSetter = ({ children }) => {
    const { sendAlert } = useContext(AlertContext);
    useEffect(() => {
      sendAlert('It\'s little test', 'info');
    }, [])
    return <>{children}</>;
  };

  const Wrapper = () => (
    <TestAppAlertProvider>
      <CurrentAlertSetter>
        <Alerts />
      </CurrentAlertSetter>
    </TestAppAlertProvider>
  )

  it('Is exists', () => {
    render(<Wrapper />);
  });

});