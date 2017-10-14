import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from './SearchPage';

describe('Book Component', () => {
  it('renders correctly', () => {
    const BookTree = renderer
      .create(
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      )
      .toJSON();
    expect(BookTree).toMatchSnapshot();
  });
});
