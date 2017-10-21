import React from 'react';
import PropTypes from 'prop-types';
import T from 'i18n-react';
import BookShelf from './BookShelf';

const Shelves = props => {
  const booksOfShelf = shelfId => {
    return props.books.filter(book => book.shelf === shelfId);
  };

  const renderBookShelves = () => {
    if (!props.shelves || props.shelves.length === 0)
      return (
        <div className="empty-message">{T.translate('noShelfCreated')}</div>
      );

    return props.shelves.map(shelf => (
      <BookShelf
        key={shelf.name}
        name={shelf.name}
        shelfId={shelf.value}
        shelves={props.shelves}
        books={booksOfShelf(shelf.value)}
        onMove={props.onMove}
      />
    ));
  };

  return <div>{renderBookShelves()}</div>;
};

Shelves.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired
};

export default Shelves;
