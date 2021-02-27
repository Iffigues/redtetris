import React from "react";
import _ from 'lodash'
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react'
import { shallow } from 'enzyme';
import Preview from '../../../src/client/components/preview'
import { player_instance, room_instance } from "../helpers/data";

describe('Preview component', () => {

  const Wrapper = () => {
    <Preview />
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Can mount', () => {
    const Wr = () => (
      <Preview
        mapsGamePreview={_.filter(room_instance.players, item => item.uuid !== player_instance.uuid && !item.visitor)}
        isVisitor={false}
        isAlone={false}
        score={room_instance.players[player_instance.uuid].score}
        sheet={room_instance.players[player_instance.uuid].sheets[0]}
        uuidRoom={room_instance.channel}
      />
    )
    const w = render(<Wr />);
    expect(w).not.toBeNull()
  })

  test('Element not visitor', () => {
    const Wr = () => (
      <Preview
        mapsGamePreview={_.filter(room_instance.players, item => item.uuid !== player_instance.uuid && !item.visitor)}
        isVisitor={true}
        isAlone={false}
        score={room_instance.players[player_instance.uuid].score}
        sheet={room_instance.players[player_instance.uuid].sheets[0]}
        uuidRoom={room_instance.channel}
      />
    )

    const { container } = render(<Wr />);
    const container_not_visitor = container.querySelector('.test--container-not-visitor')

    expect(container_not_visitor).toBeNull()
  })
});