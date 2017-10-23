import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import T from 'i18n-react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import Loader from '../components/Loader';
import { search } from '../api';

const SearchPage = createReactClass({
  getInitialState: () => ({
    searchedBooks: [],
    isLoading: false
  }),

  onSearch: async function(query) {
    this.setState({ isLoading: true });
    const books = await search(query);
    this.setState({ searchedBooks: books, isLoading: false });
  },

  setSelectedShelf: function(bookId) {
    const book = this.props.books.find(entity => entity.id === bookId);
    if (book) return book.shelf;
    return 'none';
  },

  renderBooks: function() {
    const books = this.state.searchedBooks;

    if ((!books || books.length === 0) && !this.state.isLoading)
      return (
        <li className="empty-message">{T.translate('noSearchResults')}</li>
      );

    return books.map(book => (
      <li key={book.id}>
        <Book
          book={book}
          onMove={this.props.onMove}
          selectedShelf={this.setSelectedShelf(book.id)}
          shelves={this.props.shelves}
        />
      </li>
    ));
  },

  render: function() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            {T.translate('close')}
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={e => this.onSearch(e.target.value)}
              placeholder={T.translate('searchQueryPlaceholder')}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.isLoading ? <Loader /> : ''}
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    );
  }
});

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired
};

export default SearchPage;
