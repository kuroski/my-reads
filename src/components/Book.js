import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import T from 'i18n-react';
import { shelfState } from '../common/shelfState';

const Book = props => {
  const onMove = e => {
    props.onMove(props.book, e.target.value);
  };

  const handleChange = e => {
    props.onMove(props.book, 'none');
  };

  const renderedOptions = props.shelves.map(shelf => (
    <option key={shelf.value} value={shelf.value} className="book-shelf-option">
      {shelf.name}
    </option>
  ));

  const renderRemoveButton = shelf => {
    if (shelf !== shelfState.NONE)
      return (
        <Button
          icon="trash"
          circular
          color="red"
          size="tiny"
          className="book-remove"
          onClick={handleChange}
        />
      );
  };

  return (
    <div className="book">
      {renderRemoveButton(props.selectedShelf)}
      <div className="book-top">
        <img
          src={
            props.book.imageLinks
              ? props.book.imageLinks.thumbnail
              : 'http://i.imgur.com/J5LVHEL.jpg'
          }
          width="128"
          height="193"
          className="book-cover"
          alt={props.book.title}
        />
        <div className="book-shelf-changer">
          <select onChange={onMove} value={props.selectedShelf}>
            <option value="none" disabled>
              {T.translate('moveTo')}
            </option>
            {renderedOptions}
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">
        {props.book.authors && props.book.authors.join(', ')}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }).isRequired,
  onMove: PropTypes.func.isRequired,
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ),
  selectedShelf: PropTypes.string
};

Book.defaultProps = {
  book: {
    authors: ['-'],
    imageLinks: {
      thumbnail: 'http://i.imgur.com/J5LVHEL.jpg'
    }
  },
  shelves: [],
  selectedShelf: ''
};

export default Book;
