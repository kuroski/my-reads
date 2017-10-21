import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import shallow from 'enzyme/shallow';
import App from './App';
import { shelfState } from '../common/shelfState';
import { testBooks, mockPromise } from '../common/testData';

describe('Shelves Container', () => {
  const build = () => {
    return shallow(<App />);
  };

  beforeEach(() => {
    window.fetch = jest
      .fn()
      .mockImplementationOnce(() => mockPromise(testBooks));
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
      testBooks.books[0].shelf = shelfState.READ;
      window.fetch = jest
        .fn()
        .mockImplementationOnce(() => mockPromise(testBooks))
        .mockImplementationOnce(() => mockPromise(testBooks));

      let book = wrapper.state('books')[0];
      expect(book.shelf).toEqual(shelfState.WANT_TO_READ);
      await wrapper.instance().onMove(book, shelfState.READ);
      book = wrapper.state('books')[0];
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

      testBooks.books.push(newBook);
      window.fetch = jest
        .fn()
        .mockImplementationOnce(() => mockPromise(testBooks))
        .mockImplementationOnce(() => mockPromise(testBooks));
      await wrapper.instance().onMove(newBook, shelfState.READ);

      expect(wrapper.state('books')).toHaveLength(expectedLength);
      expect(wrapper.state('books')).toContainEqual(newBook);
      done();
    });
  });
});
