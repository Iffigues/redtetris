import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Preview from '../../../src/client/components/preview'

describe('Preview component', () => {

  const Wrapper = () => {
    <Preview />
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });
});