import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import PreviewPiece from '../../../src/client/components/previewPiece'


describe('PreviewPiece component', () => {

  const Wrapper = () => {
    <PreviewPiece />
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

});