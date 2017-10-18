import { shelfState } from './shelfState';

const searchedTestBooks = {
  books: [
    {
      title: 'Book Title 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authors: ['Author One', 'Author Two'],
      imageLinks: { thumbnail: 'http://img01.jpg' },
      id: 'PGR2AwAAQBAJ',
      shelf: shelfState.WANT_TO_READ
    },
    {
      title: 'Book Title 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit2.',
      authors: ['Mist Misterious'],
      imageLinks: { thumbnail: 'http://img02.jpg' },
      id: 'PGR2AwAAQBAJ2',
      shelf: shelfState.READ
    },
    {
      title: 'Book Title 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit3.',
      authors: ['Lucky Guy', 'Telonious Monk', 'Rapid Fast'],
      imageLinks: { thumbnail: 'http://img03.jpg' },
      id: 'PGR2AwAAQBAJ3',
      shelf: shelfState.WANT_TO_READ
    }
  ]
};

const testBooks = {
  books: [
    {
      title: 'Book Title 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authors: ['Author One', 'Author Two'],
      coverImage: 'http://img01.jpg',
      id: 'PGR2AwAAQBAJ',
      shelf: shelfState.WANT_TO_READ
    },
    {
      title: 'Book Title 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit2.',
      authors: ['Mist Misterious'],
      coverImage: 'http://img02.jpg',
      id: 'PGR2AwAAQBAJ2',
      shelf: shelfState.READ
    },
    {
      title: 'Book Title 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit3.',
      authors: ['Lucky Guy', 'Telonious Monk', 'Rapid Fast'],
      coverImage: 'http://img03.jpg',
      id: 'PGR2AwAAQBAJ3',
      shelf: shelfState.WANT_TO_READ
    }
  ]
};

const testShelves = {
  shelves: [
    {
      name: 'Currently Reading',
      value: shelfState.CURRENTLY_READING
    },
    {
      name: 'Want to Read',
      value: shelfState.WANT_TO_READ
    },
    {
      name: 'Read',
      value: shelfState.READ
    }
  ]
};

export { testBooks, searchedTestBooks, testShelves };
