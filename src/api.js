import { apiToken, apiUrl } from 'common/commonData';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = apiToken();

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const get = bookId =>
  fetch(`${apiUrl}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);

export const getAll = () =>
  fetch(`${apiUrl}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);

export const update = (book, shelf) =>
  fetch(`${apiUrl}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json());

export const search = async (query, maxResults) =>
  fetch(`${apiUrl}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then(res => res.json())
    .then(data => data.books);
