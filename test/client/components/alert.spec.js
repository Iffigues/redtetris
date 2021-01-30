import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Alerts from '../../../src/client/components/alerts'


describe('Alert component', () => {

  const Wrapper = () => {
    <Alerts />
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

});