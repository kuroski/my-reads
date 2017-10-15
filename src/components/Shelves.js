import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const Shelves = props => {
  const shelvesOptions = props.shelves.map(shelve => {
    return {
      name: shelve.name,
      value: shelve.value
    };
  });

  const renderBookSHelves = () => {
    if (!props.shelves || props.shelves.length === 0)
      return <div className="empty-message">Oops, no shelve created</div>;

    return props.shelves.map(shelve => (
      <BookShelf
        key={shelve.name}
        name={shelve.name}
        books={shelve.books}
        onMove={props.onMove}
        shelveId={shelve.value}
        shelves={shelvesOptions}
      />
    ));
  };

  return <div>{renderBookSHelves()}</div>;
};

Shelves.propTypes = {
  shelves: PropTypes.array,
  onMove: PropTypes.func.isRequired
};

Shelves.defaultProps = {
  shelves: []
};

export default Shelves;
