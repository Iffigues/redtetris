// import React from 'react';

// describe('My Test Suite', () => {
  //   it('My Test Case', () => {
    //     const wrapper = shallow(<navBar />);
    //     expect(wrapper).toMatchSnapshot();
    //   });
    // });
    
    
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import { mount } from '@testing-library/react'
import Board from '../../../src/client/components/board'
import { TestAppUserProviderWithPlayer, TestAppUserProviderWithPlayerVisitor } from "../helpers/userContext";


describe('Board component', () => {

  const Wrapper = () => {
    <TestAppUserProviderWithPlayer>
      <Board />
    </TestAppUserProviderWithPlayer>
  }

  const WrapperVisitor = () => {
    <TestAppUserProviderWithPlayerVisitor>
      <Board mapGame={[]} mapGamePreview={[]} isAlone={false} score={10} sheet={[]} />
    </TestAppUserProviderWithPlayerVisitor>
  }
  
  const WrapperPlayer = () => {
    <TestAppUserProviderWithPlayer>
      <Board mapGame={[]} mapGamePreview={[]} isAlone={false} score={10} sheet={[]} />
    </TestAppUserProviderWithPlayer>
  }

  it('Is exists', () => {
    const wrapper = shallow(<Wrapper />);
    expect(wrapper).toMatchSnapshot();
  });

});