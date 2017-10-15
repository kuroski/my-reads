import React from 'react';
import renderer from 'react-test-renderer';
import BookShelf from './BookShelf';

describe('BookShelf Container', () => {
  it('renders correctly', () => {
    const BookShelfTree = renderer.create(<BookShelf />).toJSON();
    expect(BookShelfTree).toMatchSnapshot();
  });
});
