import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import Book from './Book';
import { testBooks } from '../common/test-data';

describe('Book Component', () => {
  let book;
  let wrapper;
  let mounted;

  beforeAll(() => {
    book = testBooks.books[0];

    const BookComponent = <Book coverImage={book.imageLinks.thumbnail} />;
    wrapper = shallow(BookComponent);
    mounted = mount(BookComponent);
  });

  it('renders correctly', () => {
    const BookTree = renderer.create(<Book />).toJSON();
    expect(BookTree).toMatchSnapshot();
  });

  it('renders the book cover', () => {
    expect(
      wrapper.containsMatchingElement(<img src={book.imageLinks.thumbnail} />)
    ).toBe(true);
  });
});
