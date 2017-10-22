import React from 'react';
import renderer from 'react-test-renderer';
import shallow from 'enzyme/shallow';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from './SearchPage';
import Book from '../components/Book';
import { testBooks, mockPromise } from '../common/testData';
import { shelfState } from '../common/shelfState';
import { searchTerms } from '../common/commonData';

describe('SearchPage Container', () => {
  let props;

  const build = () => {
    return shallow(<SearchPage {...props} />);
  };

  beforeAll(() => {
    props = {
      shelves: [],
      onMove: jest.fn(),
      books: testBooks.books
    };
  });

  beforeEach(() => {
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockPromise(testBooks));
  });

  it('renders correctly', () => {
    const SearchPageTree = renderer
      .create(
        <MemoryRouter>
          <SearchPage shelves={[]} onMove={() => {}} books={[]} />
        </MemoryRouter>
      )
      .toJSON();
    expect(SearchPageTree).toMatchSnapshot();
  });

  it('shows a Book list when term is searched', done => {
    const wrapper = build();
    const input = wrapper.find('input').first();

    input.simulate('change', {
      target: { value: searchTerms[0] }
    });

    setTimeout(() => {
      wrapper.update();
      const firstBook = wrapper.find(Book).first();

      expect(wrapper.state('searchedBooks')).toHaveLength(
        testBooks.books.length
      );
      expect(firstBook).toBeDefined();
      expect(firstBook.prop('book').id).toEqual(testBooks.books[0].id);
      done();
    });
  });

  it('must call "onMove" prop when Book is changed', () => {
    const wrapper = build();
    wrapper.setState({ searchedBooks: testBooks.books });
    const firstBook = wrapper.find(Book).first();
    const expectedBook = {
      id: firstBook.prop('id'),
      title: firstBook.prop('title'),
      authors: firstBook.prop('authors'),
      coverImage: firstBook.prop('coverImage')
    };

    firstBook.prop('onMove')(expectedBook, shelfState.CURRENTLY_READING);

    expect(props.onMove).toHaveBeenCalledTimes(1);
    expect(props.onMove).toHaveBeenCalledWith(
      expectedBook,
      shelfState.CURRENTLY_READING
    );
  });

  it('shows an error message when searched query is not on the available terms list', done => {
    const wrapper = build();
    const input = wrapper.find('input').first();

    input.simulate('change', {
      target: { value: 'doesnt exist' }
    });

    setTimeout(() => {
      wrapper.update();
      const errorMessage = wrapper.find('.empty-message').first();

      expect(errorMessage).toBeDefined();
      expect(errorMessage.html()).toContain('noSearchResults');
      done();
    });
  });

  it('select book shelf option if the book is already added to the shelves', () => {
    const wrapper = build();
    wrapper.setState({
      searchedBooks: testBooks.books
    });
    wrapper.update();

    const firstBookRendered = wrapper.find(Book).first();
    const firstBook = wrapper.instance().props.books[0];
    expect(firstBookRendered.prop('selectedShelf')).toEqual(firstBook.shelf);
  });
});
