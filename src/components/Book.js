import React from 'react';
import PropTypes from 'prop-types';
import { shelfState } from '../common/shelfState';

const Book = props => {
  const onMove = e => {
    props.onMove(props.id, e.target.value);
  };

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
          <select onChange={onMove}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value={shelfState.CURRENTLY_READING}>
              Currently Reading
            </option>
            <option value={shelfState.WANT_TO_READ}>Want to Read</option>
            <option value={shelfState.READ}>Read</option>
            <option value={shelfState.NONE}>None</option>
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
  coverImage: PropTypes.string
};

Book.defaultProps = {
  coverImage: 'http://i.imgur.com/J5LVHEL.jpg'
};

export default Book;
