import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Game from '../../../src/client/components/game'

describe('Alert component', () => {

  const Wrapper = () => {
    <Game />
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

});