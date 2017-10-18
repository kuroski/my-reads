import { shelfState } from './shelfState';

export const apiUrl = 'https://reactnd-books-api.udacity.com';

export const apiToken = () => {
  let token = localStorage.token;
  if (!token)
    token = localStorage.token = Math.random()
      .toString(36)
      .substr(-8);

  return token;
};

export const shelves = {
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

export const searchTerms = [
  'Android',
  'Art',
  'Artificial Intelligence',
  'Astronomy',
  'Austen',
  'Baseball',
  'Basketball',
  'Bhagat',
  'Biography',
  'Brief',
  'Business',
  'Camus',
  'Cervantes',
  'Christie',
  'Classics',
  'Comics',
  'Cook',
  'Cricket',
  'Cycling',
  'Desai',
  'Design',
  'Development',
  'Digital Marketing',
  'Drama',
  'Drawing',
  'Dumas',
  'Education',
  'Everything',
  'Fantasy',
  'Film',
  'Finance',
  'First',
  'Fitness',
  'Football',
  'Future',
  'Games',
  'Gandhi',
  'Homer',
  'Horror',
  'Hugo',
  'Ibsen',
  'Journey',
  'Kafka',
  'King',
  'Lahiri',
  'Larsson',
  'Learn',
  'Literary Fiction',
  'Make',
  'Manage',
  'Marquez',
  'Money',
  'Mystery',
  'Negotiate',
  'Painting',
  'Philosophy',
  'Photography',
  'Poetry',
  'Production',
  'Programming',
  'React',
  'Redux',
  'River',
  'Robotics',
  'Rowling',
  'Satire',
  'Science Fiction',
  'Shakespeare',
  'Singh',
  'Swimming',
  'Tale',
  'Thrun',
  'Time',
  'Tolstoy',
  'Travel',
  'Ultimate',
  'Virtual Reality',
  'Web Development',
  'iOS'
];
