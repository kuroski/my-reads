import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = props => {
  const renderBooks = () => {
    if (!props.books || props.books.length === 0)
      return <li className="empty-message">No books on this shelf</li>;

    return props.books.map(book => (
      <li key={book.id}>
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors}
          coverImage={book.imageLinks.thumbnail}
          onMove={props.onMove}
          selectedShelve={props.shelveId}
          shelves={props.shelves}
        />
      </li>
    ));
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{renderBooks()}</ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  name: PropTypes.string.isRequired,
  shelveId: PropTypes.string,
  onMove: PropTypes.func.isRequired,
  books: PropTypes.array,
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  )
};

BookShelf.defaultProps = {
  books: [],
  shelves: [],
  shelfId: ''
};

export default BookShelf;
