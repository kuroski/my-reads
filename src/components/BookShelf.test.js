import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BookShelf from './BookShelf';

describe('BookShelf Container', () => {
  let props;

  const build = () => {
    return shallow(<BookShelf {...props} />);
  };

  beforeAll(() => {
    props = {};
  });

  it('renders correctly', () => {
    const wrapper = build();
    const BookShelfTree = renderer.create(wrapper[0]).toJSON();
    expect(BookShelfTree).toMatchSnapshot();
  });
});
