import React from 'react';
import renderer from 'react-test-renderer';
import Shelves from './Shelves';

describe('Shelves Container', () => {
  it('renders correctly', () => {
    const ShelvesTree = renderer.create(<Shelves />).toJSON();
    expect(ShelvesTree).toMatchSnapshot();
  });
});
