import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Link } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from './App';
import SearchPage from './SearchPage';
import Shelves from '../components/Shelves';
import { shelfState } from '../common/shelfState';
import { testBooks, searchedTestBooks, jsonHeaders } from '../common/testData';
import { apiUrl } from '../common/commonData';

describe('Shelves Container', () => {
  const buildMounted = () => {
    return mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  };

  const build = () => {
    return shallow(<App />);
  };

  beforeAll(() => {
    fetch.mockResponse(JSON.stringify(testBooks), { jsonHeaders });
  });

  it('renders App Container correctly', () => {
    const ShelvesTree = renderer
      .create(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      )
      .toJSON();
    expect(ShelvesTree).toMatchSnapshot();
  });

  // it('must call "onMove" when shelf is changed', () => {
  //   const wrapper = buildMounted();
  //   wrapper.setState({ books: testBooks.books });
  //   const shelves = wrapper.find(Shelves);
  //   const bookState = wrapper.state('books')[0];
  //   const expectedBook = {
  //     id: bookState.id,
  //     title: bookState.title,
  //     authors: bookState.authors,
  //     coverImage: bookState.coverImage
  //   };

  //   expect(wrapper.state('books')[0].shelf).toEqual(shelfState.WANT_TO_READ);
  //   shelves.prop('onMove')(expectedBook, shelfState.READ);
  //   expect(wrapper.state('books')[0].shelf).toEqual(shelfState.READ);
  // });

  // it('must add a new book when "onMove" is called', () => {
  //   const wrapper = build();
  //   wrapper.setState({ books: testBooks.books });
  //   const expectedLength = testBooks.books.length + 1;
  //   const expectedBook = {
  //     id: 'radiohead',
  //     title: 'muse',
  //     authors: ['portugal the man', 'polyphia'],
  //     shelf: shelfState.READ,
  //     coverImage:
  //       'https://pbs.twimg.com/profile_images/884549260439560192/BQhRcQsg.jpg'
  //   };

  //   expect(wrapper.state('books')).toEqual(testBooks.books);
  //   wrapper.instance().onMove(expectedBook, shelfState.READ);
  //   expect(wrapper.state('books')).toHaveLength(expectedLength);
  //   expect(wrapper.state('books')).toContainEqual(expectedBook);
  // });
});
