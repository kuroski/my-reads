import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Message } from 'semantic-ui-react';
import T from 'i18n-react';
import Book from './Book';

const BookShelf = props => {
  const renderBooks = () => {
    if (!props.books || props.books.length === 0)
      return (
        <Message as="li" className="empty-message">
          {T.translate('emptyShelf')}
        </Message>
      );

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
    <div className="book-shelf">
      <Header as="h2" attached="top">
        {props.name}
      </Header>
      <Segment attached>
        <div className="bookshelf-books">
          <ol className="books-grid">{renderBooks()}</ol>
        </div>
      </Segment>
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
