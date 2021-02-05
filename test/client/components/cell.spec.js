import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Enzyme, { mount, shallow } from "enzyme";
import Cell from '../../../src/client/components/cell'
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
describe('Cell component', () => {

  const Wrapper = () => (
    <Cell />
  )

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Can mount', () => {
    const Wr = () => (
      <Cell
        type={1}
        isOtherUser={false}
      />
    )
    const w = mount(<Wr />);
    expect(w).not.toBeNull()
  })
});