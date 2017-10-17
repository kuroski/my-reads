import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import nock from 'nock';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from './SearchPage';

describe('SearchPage Container', () => {
  let props;

  const build = () => {
    return shallow(<SearchPage {...props} />);
  };

  beforeAll(() => {
    props = {};
  });

  afterEach(() => {
    nock.cleanAll();
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

  // TODO: Find a way to mock fetch requests
  // it('shows a Book list when searched', () => {
  //   const wrapper = build();
  //   const request = nock('https://reactnd-books-api.udacity.com', {
  //     reqheaders: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .post('/search', {
  //       maxResults: 20,
  //       query: searchTerms[0]
  //     })
  //     .reply(200, testBooks);
  //
  //   wrapper
  //     .instance()
  //     .onSearch(searchTerms[0])
  //     .then(response => {
  //       console.log(wrapper.debug());
  //       console.log(wrapper.state('searchedBooks'));
  //       request.done();
  //     });
  // });
});
