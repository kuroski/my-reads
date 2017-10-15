import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BookShelf from './BookShelf';
import Book from './Book';
import { testBooks } from '../common/testData';
import { shelfState } from '../common/shelfState';

describe('BookShelf Container', () => {
  let props;

  const build = () => {
    return shallow(<BookShelf {...props} />);
  };

  beforeAll(() => {
    props = {
      books: [testBooks.books[0]],
      onMove: jest.fn()
    };
  });

  it('renders correctly', () => {
    const wrapper = build();
    const BookShelfTree = renderer.create(wrapper[0]).toJSON();
    expect(BookShelfTree).toMatchSnapshot();
  });

  it('renders a Book component when a book is passed', () => {
    const firstBook = testBooks.books[0];
    const wrapper = build();
    const book = wrapper.find(Book);

    expect(book).toHaveLength(1);
    _expectBookRenderedCorrectly(book, firstBook);
  });

  it('renders a empty shelve message when no book or empty array is passed', () => {
    props.books = [];
    const wrapper = build();
    const emptyMessage = wrapper.find('.empty-message');

    expect(wrapper.find(Book)).toHaveLength(0);
    expect(emptyMessage).toHaveLength(1);
    expect(emptyMessage.contains('No books on this shelve')).toBe(true);
  });

  it('renders some Books components when a list of books are passed', () => {
    props.books = testBooks.books;
    const wrapper = build();
    const firstBook = wrapper.find(Book).first();

    expect(wrapper.find(Book)).toHaveLength(testBooks.books.length);
    _expectBookRenderedCorrectly(firstBook, testBooks.books[0]);
  });

  it('must pass a bound "onMove" prop', () => {
    const wrapper = build();
    const book = wrapper.find(Book).first();

    book.prop('onMove')(book.id, shelfState.CURRENTLY_READING);
    expect(props.onMove).toHaveBeenCalledTimes(1);
    expect(props.onMove).toHaveBeenCalledWith(
      book.id,
      shelfState.CURRENTLY_READING
    );
  });

  function _expectBookRenderedCorrectly(book, comparableBook) {
    expect(book.prop('id')).toEqual(comparableBook.id);
    expect(book.prop('title')).toEqual(comparableBook.title);
    expect(book.prop('authors')).toEqual(comparableBook.authors);
    expect(book.prop('coverImage')).toEqual(
      comparableBook.imageLinks.thumbnail
    );
    expect(book.prop('onMove')).toEqual(props.onMove);
  }
});
