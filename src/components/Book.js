import React from 'react';
import PropTypes from 'prop-types';

const Book = props => (
  <div className="book">
    <div className="book-top">
      <img
        src={props.coverImage}
        width="128"
        height="193"
        className="book-cover"
      />
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">To Kill a Mockingbird</div>
    <div className="book-authors">Harper Lee</div>
  </div>
);

Book.propTypes = {
  coverImage: PropTypes.string
};

Book.defaultProps = {
  coverImage: 'http://i.imgur.com/J5LVHEL.jpg'
};

export default Book;
