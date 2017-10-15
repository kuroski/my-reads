import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = props => {
  function renderBooks() {
    if (!props.books || props.books.length === 0)
      return <li className="empty-message">No books on this shelve</li>;

    return props.books.map(book => (
      <li key={book.id}>
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors}
          onMove={(id, shelve) => console.log(id, shelve)}
          coverImage={book.imageLinks.thumbnail}
        />
      </li>
    ));
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{renderBooks()}</ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array
};

BookShelf.defaultProps = {
  books: []
};

export default BookShelf;
