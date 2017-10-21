import React from 'react';
import PropTypes from 'prop-types';
import T from 'i18n-react';
import Book from './Book';

const BookShelf = props => {
  const renderBooks = () => {
    if (!props.books || props.books.length === 0)
      return <li className="empty-message">{T.translate('emptyShelf')}</li>;

    return props.books.map(book => (
      <li key={book.id}>
        <Book
          book={book}
          onMove={props.onMove}
          selectedShelf={props.shelfId}
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
  shelfId: PropTypes.string,
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
