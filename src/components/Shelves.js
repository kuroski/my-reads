import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const Shelves = props => {
  const renderBookSHelves = () => {
    if (!props.shelves || props.shelves.length === 0)
      return <div className="empty-message">Oops, no shelve created</div>;

    return props.shelves.map(shelve => (
      <BookShelf
        key={shelve.name}
        name={shelve.name}
        shelveId={shelve.value}
        shelves={props.shelves}
        books={props.books}
        onMove={props.onMove}
      />
    ));
  };

  return <div>{renderBookSHelves()}</div>;
};

Shelves.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired
};

export default Shelves;
