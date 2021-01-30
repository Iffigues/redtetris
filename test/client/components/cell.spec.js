import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Cell from '../../../src/client/components/cell'


describe('Cell component', () => {

  const Wrapper = () => {
    <Cell />
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

});