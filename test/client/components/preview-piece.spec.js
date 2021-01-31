import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import PreviewPiece from '../../../src/client/components/previewPiece'
import Adapter from "enzyme-adapter-react-16";


Enzyme.configure({ adapter: new Adapter() });
describe('PreviewPiece component', () => {

  const Wrapper = () => (
    <PreviewPiece />
  )

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Can mount', () => {
    const Wr = () => (
      <PreviewPiece
        sheet={ {type: 1}}
      />
    )
    const w = mount(<Wr />);
    expect(w).not.toBeNull()
  })

});