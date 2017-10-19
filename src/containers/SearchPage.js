import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import Loader from '../components/Loader';
import { search } from '../api';
import { searchTerms } from '../common/commonData';

const SearchPage = createReactClass({
  getInitialState: () => ({
    searchedBooks: [],
    isLoading: false
  }),

  onSearch: async function(query) {
    if (!searchTerms.includes(query)) return;

    this.setState({ isLoading: true });
    const books = await search(query);
    this.setState({ searchedBooks: books, isLoading: false });
  },

  renderBooks: function() {
    const books = this.state.searchedBooks;

    if ((!books || books.length === 0) && !this.state.isLoading)
      return (
        <li className="empty-message">No books here, search for something</li>
      );

    return books.map(book => (
      <li key={book.id}>
        <Book
          book={book}
          onMove={this.props.onMove}
          selectedShelf="none"
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
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={e => this.onSearch(e.target.value)}
              placeholder="Search by title or author"
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
  shelves: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired
};

export default SearchPage;
