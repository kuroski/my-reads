import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Shelves from './Shelves';
import BookShelf from './BookShelf';
import { testBooks, testShelves } from '../common/testData';
import { shelfState } from '../common/shelfState';

describe('Shelves Container', () => {
  let props;

  const build = () => {
    return shallow(<Shelves {...props} />);
  };

  beforeAll(() => {
    props = {
      shelves: [testShelves.shelves[0]],
      books: testBooks.books,
      onMove: jest.fn()
    };
  });

  it('renders Shelves Component correctly', () => {
    const wrapper = build();
    const ShelvesTree = renderer.create(wrapper[0]).toJSON();
    expect(ShelvesTree).toMatchSnapshot();
  });

  it('renders a BookShelf component when a shelve is passed', () => {
    const wrapper = build();
    const bookShelf = wrapper.find(BookShelf);

    expect(bookShelf).toHaveLength(1);
    _expectBookShelveRenderedCorrectly(bookShelf);
  });

  it('renders a empty shelve message when no shelves prop or empty array is passed', () => {
    props.shelves = [];
    const wrapper = build();
    const emptyMessage = wrapper.find('.empty-message');

    expect(wrapper.find(BookShelf)).toHaveLength(0);
    expect(emptyMessage).toHaveLength(1);
    expect(emptyMessage.contains('Oops, no shelve created')).toBe(true);
  });

  it('renders some BookShelves components when a list of shelves are passed', () => {
    props.shelves = testShelves.shelves;
    const wrapper = build();
    const firstBookShelf = wrapper.find(BookShelf).first();

    expect(wrapper.find(BookShelf)).toHaveLength(testShelves.shelves.length);
    _expectBookShelveRenderedCorrectly(firstBookShelf);
  });

  it('must pass a bound "onMove" prop', () => {
    const wrapper = build();
    const bookShelf = wrapper.find(BookShelf).first();

    bookShelf.prop('onMove')(bookShelf.id, shelfState.CURRENTLY_READING);
    expect(props.onMove).toHaveBeenCalledTimes(1);
    expect(props.onMove).toHaveBeenCalledWith(
      bookShelf.id,
      shelfState.CURRENTLY_READING
    );
  });

  function _expectBookShelveRenderedCorrectly(bookShelf) {
    const comparableBookShelf = testShelves.shelves[0];

    expect(bookShelf.prop('name')).toEqual(comparableBookShelf.name);
    expect(bookShelf.prop('shelveId')).toEqual(comparableBookShelf.value);
    expect(bookShelf.prop('shelves')).toEqual(props.shelves);
    expect(bookShelf.prop('books')).toEqual(props.books);
    expect(bookShelf.prop('onMove')).toEqual(props.onMove);
  }
});
