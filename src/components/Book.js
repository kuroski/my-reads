import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
  const onMove = e => {
    props.onMove(props.id, e.target.value);
  };

  const renderedOptions = props.shelves.map(shelve => (
    <option
      key={shelve.value}
      value={shelve.value}
      className="book-shelf-option"
    >
      {shelve.name}
    </option>
  ));

  return (
    <div className="book">
      <div className="book-top">
        <img
          src={props.coverImage}
          width="128"
          height="193"
          className="book-cover"
          alt={props.title}
        />
        <div className="book-shelf-changer">
          <select onChange={onMove} value={props.selectedShelve}>
            <option value="none" disabled>
              Move to...
            </option>
            {renderedOptions}
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.authors.join(', ')}</div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
  coverImage: PropTypes.string,
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ),
  selectedShelve: PropTypes.string
};

Book.defaultProps = {
  coverImage: 'http://i.imgur.com/J5LVHEL.jpg',
  shelves: [],
  selectedShelve: ''
};

export default Book;
