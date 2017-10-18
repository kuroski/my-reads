import React from 'react';
import renderer from 'react-test-renderer';
import shallow from 'enzyme/shallow';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'fetch-mock';
import SearchPage from './SearchPage';
import Book from '../components/Book';
import { searchedTestBooks } from '../common/testData';
import { shelfState } from '../common/shelfState';
import { apiUrl, searchTerms } from '../common/commonData';

describe('SearchPage Container', () => {
  const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };
  let props;

  const build = () => {
    return shallow(<SearchPage {...props} />);
  };

  beforeAll(() => {
    props = {
      shelves: [],
      onMove: jest.fn()
    };
  });

  it('renders correctly', () => {
    const SearchPageTree = renderer
      .create(
        <MemoryRouter>
          <SearchPage shelves={[]} onMove={() => {}} />
        </MemoryRouter>
      )
      .toJSON();
    expect(SearchPageTree).toMatchSnapshot();
  });

  it('shows a Book list when term is searched', done => {
    const wrapper = build();
    const input = wrapper.find('input').first();
    const fetch = fetchMock.post(`${apiUrl}/search`, searchedTestBooks);

    input.simulate('change', {
      target: { value: searchTerms[0] }
    });

    setTimeout(() => {
      wrapper.update();
      const firstBook = wrapper.find(Book).first();

      expect(wrapper.state('searchedBooks')).toHaveLength(
        searchedTestBooks.books.length
      );
      expect(firstBook).toBeDefined();
      expect(firstBook.prop('id')).toEqual(searchedTestBooks.books[0].id);
      done();
    });
  });

  it('must call "onMove" prop when Book is changed', () => {
    const wrapper = build();
    wrapper.setState({ searchedBooks: searchedTestBooks.books });
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
});
