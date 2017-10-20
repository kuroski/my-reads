import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import shallow from 'enzyme/shallow';
import App from './App';
import { shelfState } from '../common/shelfState';
import { testBooks, mockResponse } from '../common/testData';

describe('Shelves Container', () => {
  const build = () => {
    return shallow(<App />);
  };

  beforeAll(() => {
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockResponse(200, null, JSON.stringify(testBooks)))
      );
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

  it('must call "onMove" when shelf is changed', done => {
    const wrapper = build();

    setTimeout(async () => {
      const book = wrapper.state('books')[0];
      expect(book.shelf).toEqual(shelfState.WANT_TO_READ);
      await wrapper.instance().onMove(book, shelfState.READ);
      expect(book.shelf).toEqual(shelfState.READ);
      done();
    });
  });

  it('must add a new book when "onMove" is called', done => {
    const wrapper = build();

    setTimeout(async () => {
      const expectedLength = testBooks.books.length + 1;
      const newBook = {
        id: 'radiohead',
        title: 'muse',
        authors: ['portugal the man', 'polyphia'],
        shelf: shelfState.READ,
        coverImage:
          'https://pbs.twimg.com/profile_images/884549260439560192/BQhRcQsg.jpg'
      };

      expect(wrapper.state('books')).toEqual(testBooks.books);
      await wrapper.instance().onMove(newBook, shelfState.READ);
      expect(wrapper.state('books')).toHaveLength(expectedLength);
      expect(wrapper.state('books')).toContainEqual(newBook);
      done();
    });
  });
});
