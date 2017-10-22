import React from 'react';
import renderer from 'react-test-renderer';
import shallow from 'enzyme/shallow';
import Book from './Book';
import { testBooks, testShelves } from '../common/testData';
import { shelfState } from '../common/shelfState';

describe('Book Component', () => {
  let book;
  let props;

  const build = () => {
    return shallow(<Book {...props} />);
  };

  beforeEach(() => {
    book = testBooks.books[0];
    props = {
      book,
      shelves: testShelves.shelves,
      selectedShelf: testShelves.shelves[1].value,
      onMove: jest.fn()
    };
  });

  it('renders Book Component correctly', () => {
    const wrapper = build();
    const BookTree = renderer.create(wrapper[0]).toJSON();
    expect(BookTree).toMatchSnapshot();
  });

  it('should show the book cover', () => {
    const wrapper = build();
    expect(
      wrapper.containsMatchingElement(
        <img src={book.coverImage} alt={book.title} />
      )
    ).toBe(true);
  });

  it('must show the book cover default image when no cover is provided', () => {
    delete props.book.imageLinks;
    const wrapper = build();
    expect(
      wrapper.containsMatchingElement(
        <img src="http://i.imgur.com/J5LVHEL.jpg" alt={book.title} />
      )
    ).toBe(true);
  });

  it('must show the book title', () => {
    const wrapper = build();
    expect(wrapper.text().includes(book.title)).toBe(true);
  });

  it('must show the book authors', () => {
    const wrapper = build();
    book.authors.forEach(author => {
      expect(wrapper.text().includes(author)).toBe(true);
    });
  });

  it('must call "onMove" prop when shelf is changed', () => {
    const wrapper = build();
    const select = wrapper.find('select');

    select.simulate('change', {
      target: { value: shelfState.CURRENTLY_READING }
    });

    expect(props.onMove).toHaveBeenCalledTimes(1);
    expect(props.onMove).toHaveBeenCalledWith(
      book,
      shelfState.CURRENTLY_READING
    );
  });

  it('renders a options list of shelves', () => {
    const wrapper = build();
    const options = wrapper.find('.book-shelf-option');

    expect(options).toHaveLength(testShelves.shelves.length);
    options.forEach((option, index) => {
      const optionComparable = testShelves.shelves[index];
      expect(option.prop('value')).toEqual(optionComparable.value);
      expect(option.prop('children')).toEqual(optionComparable.name);
    });
  });

  it('hide remove button when shelve is "none"', () => {
    props.selectedShelf = shelfState.NONE;
    const wrapper = build();
    const removeButton = wrapper.find('.book-remove');
    expect(removeButton).toHaveLength(0);
  });

  it('set option when "shelfSelected" prop is passed', () => {
    const wrapper = build();
    expect(wrapper.find('select').prop('value')).toEqual(props.selectedShelf);
  });

  it('must call "onMove" prop with "none" shelf when delete button is clicked', () => {
    const wrapper = build();
    const select = wrapper.find('Button');

    select.simulate('click');

    expect(props.onMove).toHaveBeenCalledTimes(1);
    expect(props.onMove).toHaveBeenCalledWith(book, shelfState.NONE);
  });
});
