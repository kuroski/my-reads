import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
  const onMove = e => {
    const book = {
      id: props.id,
      title: props.title,
      authors: props.authors,
      coverImage: props.coverImage
    };
    props.onMove(book, e.target.value);
  };

  const renderedOptions = props.shelves.map(shelf => (
    <option key={shelf.value} value={shelf.value} className="book-shelf-option">
      {shelf.name}
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
          <select onChange={onMove} value={props.selectedShelf}>
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
  selectedShelf: PropTypes.string
};

Book.defaultProps = {
  coverImage: 'http://i.imgur.com/J5LVHEL.jpg',
  shelves: [],
  selectedShelf: ''
};

export default Book;
