import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App from './App';
import Shelves from '../components/Shelves';
import { shelfState } from '../common/shelfState';
import { testBooks } from '../common/testData';

describe('Shelves Container', () => {
  const build = () => {
    return mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  };

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

  it('must call "onMove" prop when shelf is changed', () => {
    const wrapper = build();
    wrapper.setState({ books: testBooks.books });
    const shelves = wrapper.find(Shelves);
    const bookState = wrapper.state('books')[0];
    const expectedBook = {
      id: bookState.id,
      title: bookState.title,
      authors: bookState.authors,
      coverImage: bookState.imageLinks.thumbnail
    };

    expect(wrapper.state('books')[0].shelf).toEqual(shelfState.WANT_TO_READ);
    shelves.prop('onMove')(expectedBook, shelfState.READ);
    expect(wrapper.state('books')[0].shelf).toEqual(shelfState.READ);
  });
});
