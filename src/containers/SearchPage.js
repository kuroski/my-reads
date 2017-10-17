import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import Loader from '../components/Loader';
import Autosuggest from 'react-autosuggest';
import { search } from '../api';
import { searchTerms } from '../common/commonData';

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : searchTerms.filter(
        lang => lang.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const renderSuggestion = suggestion => <div>{suggestion}</div>;

const SearchPage = createReactClass({
  getInitialState: () => ({
    searchedBooks: [],
    value: '',
    suggestions: [],
    isLoading: false
  }),

  onSearch: async function(query) {
    if (!searchTerms.includes(query)) {
      console.error('Bad search, this term are not supported');
      return;
    }

    this.setState({ isLoading: true });
    const books = await search(query);
    this.setState({ searchedBooks: books, isLoading: false });
  },

  onChange: function(event, { newValue }) {
    this.setState({
      value: newValue
    });
    this.onSearch(newValue);
  },

  onSuggestionsFetchRequested: function({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  },

  onSuggestionsClearRequested: function() {
    this.setState({
      suggestions: []
    });
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
          id={book.id}
          title={book.title}
          authors={book.authors}
          coverImage={book.imageLinks.thumbnail}
          onMove={this.props.onMove}
          selectedShelf="none"
          shelves={this.props.shelves}
        />
      </li>
    ));
  },

  render: function() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search by title or author',
      value,
      onChange: this.onChange
    };

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={suggestion => suggestion}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
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
