import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Book from './Book';
import { testBooks, testShelvesOptions } from '../common/testData';
import { shelfState } from '../common/shelfState';

describe('Book Component', () => {
  let book;
  let props;
  let onMove = jest.fn();

  const build = () => {
    return shallow(<Book {...props} />);
  };

  beforeAll(() => {
    book = testBooks.books[0];
    props = {
      coverImage: book.imageLinks.thumbnail,
      id: book.id,
      title: book.title,
      authors: book.authors,
      shelves: testShelvesOptions.shelves,
      selectedShelve: testShelvesOptions.shelves[1].value,
      onMove
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
        <img src={book.imageLinks.thumbnail} alt={book.title} />
      )
    ).toBe(true);
  });

  it('should must show the book cover default image when no cover is provided', () => {
    delete props.coverImage;
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
    expect(onMove).toHaveBeenCalledTimes(1);
    expect(onMove).toHaveBeenCalledWith(
      book.id,
      props.selectedShelve,
      shelfState.CURRENTLY_READING
    );
  });

  it('renders a options list of shelves', () => {
    const wrapper = build();
    const options = wrapper.find('.book-shelf-option');

    expect(options).toHaveLength(testShelvesOptions.shelves.length);
    options.forEach((option, index) => {
      const optionComparable = testShelvesOptions.shelves[index];
      expect(option.prop('value')).toEqual(optionComparable.value);
      expect(option.prop('children')).toEqual(optionComparable.name);
    });
  });

  it('set option when "shelfSelected" prop is passed', () => {
    const wrapper = build();
    expect(wrapper.find('select').prop('value')).toEqual(props.selectedShelve);
  });
});
