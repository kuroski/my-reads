import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'fetch-mock';
import SearchPage from './SearchPage';
import Book from '../components/Book';
import { testBooks } from '../common/testData';
import { searchTerms, apiUrl } from '../common/commonData';

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
    props = {};
  });

  it('renders correctly', () => {
    const SearchPageTree = renderer
      .create(
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      )
      .toJSON();
    expect(SearchPageTree).toMatchSnapshot();
  });

  it('shows a Book list when term is searched', () => {
    const wrapper = build();

    fetchMock.post(`${apiUrl}/search`, testBooks);
    wrapper
      .instance()
      .onSearch(searchTerms[0])
      .then(() => {
        wrapper.update();
        const firstBook = wrapper.find(Book).first();

        expect(wrapper.state('searchedBooks')).toHaveLength(
          testBooks.books.length
        );
        expect(firstBook).toBeDefined();
        expect(firstBook.prop('id')).toEqual(testBooks.books[0].id);
      });
  });
});
