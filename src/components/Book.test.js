import React from 'react';
import renderer from 'react-test-renderer';
import Book from './Book';

describe('Book Component', () => {
  it('renders correctly', () => {
    const BookTree = renderer.create(<Book />).toJSON();
    expect(BookTree).toMatchSnapshot();
  });
});
