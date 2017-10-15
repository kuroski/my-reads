import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Book from './Book';
import { testBooks } from '../common/testData';
import { shelfState } from '../common/shelfState';

describe('Book Component', () => {
  let BookComponent;
  let book;
  let wrapper;
  let onMove = jest.fn();

  beforeAll(() => {
    book = testBooks.books[0];
    BookComponent = (
      <Book
        coverImage={book.imageLinks.thumbnail}
        id={book.id}
        title={book.title}
        authors={book.authors}
        onMove={onMove}
      />
    );
    wrapper = shallow(BookComponent);
  });

  it('renders correctly', () => {
    const BookTree = renderer.create(BookComponent).toJSON();
    expect(BookTree).toMatchSnapshot();
  });

  it('should show the book cover', () => {
    expect(
      wrapper.containsMatchingElement(
        <img src={book.imageLinks.thumbnail} alt={book.title} />
      )
    ).toBe(true);
  });

  it('should must show the book cover default image when no cover is provided', () => {
    const noIamgeWrapper = shallow(
      <Book
        id={book.id}
        title={book.title}
        authors={book.authors}
        onMove={onMove}
      />
    );
    expect(
      noIamgeWrapper.containsMatchingElement(
        <img src="http://i.imgur.com/J5LVHEL.jpg" alt={book.title} />
      )
    ).toBe(true);
  });

  it('must show the book title', () => {
    expect(wrapper.text().includes(book.title)).toBe(true);
  });

  it('must show the book authors', () => {
    book.authors.forEach(author => {
      expect(wrapper.text().includes(author)).toBe(true);
    });
  });

  it('must call "onMove" prop when shelf is changed', () => {
    const select = wrapper.find('select');
    select.simulate('change', {
      target: { value: shelfState.CURRENTLY_READING }
    });
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(onMove).toHaveBeenCalledWith(book.id, shelfState.CURRENTLY_READING);
  });
});
