import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { testShelves } from '../common/testData';
import { shelfState } from '../common/shelfState';

describe('Shelves Container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<App />);
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

  // it('must pass a bound "onMove" prop to Shelves component', () => {
  // TODO: Fix this test
  // const instance = wrapper.instance();
  // const spy = jest.spyOn(instance, 'onMove');
  // const shelves = wrapper.find(Shelves).first();
  // shelves.prop('onMove')('abc', shelfState.CURRENTLY_READING);
  // expect(spy).toHaveBeenCalledTimes(1);
  // expect(spy).toHaveBeenCalledWith('abc', shelfState.CURRENTLY_READING);
  // });

  // TODO: Continue this test
  // it('moves the book between shelves', () => {
  //   const shelve = testShelves.shelves[1];
  //   const book = shelve.books[0];
  //
  //   wrapper.setState({ shelves: testShelves.shelves });
  //   wrapper.instance().onMove(book.id, shelve.value, shelfState.READ);
  //
  //   expect(wrapper.state('shelves')[1].books).toHaveLength(0);
  //   expect(wrapper.state('shelves')[2].books).toHaveLength(1);
  //   expect(wrapper.state('shelves')[2].books).toEqual([book]);
  // });
});
