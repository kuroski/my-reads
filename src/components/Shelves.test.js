import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Shelves from './Shelves';
import BookShelf from './BookShelf';
import { testShelves } from '../common/testData';
import { shelfState } from '../common/shelfState';

describe('Shelves Container', () => {
  let props;
  let shelvesOptions;

  const build = () => {
    shelvesOptions = props.shelves.map(shelve => {
      return {
        name: shelve.name,
        value: shelve.value
      };
    });

    return shallow(<Shelves {...props} />);
  };

  beforeAll(() => {
    props = {
      shelves: [testShelves.shelves[0]],
      onMove: jest.fn()
    };
  });

  it('renders Shelves Container correctly', () => {
    const wrapper = build();
    const ShelvesTree = renderer.create(wrapper[0]).toJSON();
    expect(ShelvesTree).toMatchSnapshot();
  });

  it('renders a BookShelf component when a shelve is passed', () => {
    const firstBookShelve = testShelves.shelves[0];
    const wrapper = build();
    const bookShelf = wrapper.find(BookShelf);

    expect(bookShelf).toHaveLength(1);
    _expectBookShelveRenderedCorrectly(bookShelf, firstBookShelve);
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
    _expectBookShelveRenderedCorrectly(firstBookShelf, testShelves.shelves[0]);
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

  function _expectBookShelveRenderedCorrectly(bookShelf, comparableBookShelf) {
    expect(bookShelf.prop('title')).toEqual(comparableBookShelf.title);
    expect(bookShelf.prop('books')).toEqual(comparableBookShelf.books);
    expect(bookShelf.prop('shelveId')).toEqual(comparableBookShelf.value);
    expect(bookShelf.prop('onMove')).toEqual(props.onMove);
    expect(bookShelf.prop('shelves')).toEqual(shelvesOptions);
  }
});
