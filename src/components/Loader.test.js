import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('BookShelf Container', () => {
  const build = () => {
    return shallow(<Loader />);
  };

  it('renders Loader Component correctly', () => {
    const wrapper = build();
    const LoaderTree = renderer.create(wrapper[0]).toJSON();
    expect(LoaderTree).toMatchSnapshot();
  });
});
