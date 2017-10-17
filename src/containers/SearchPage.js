import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';
import { search } from '../api';
import { searchTerms } from '../common/commonData';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedBooks: []
    };

    this.onSearch = this.onSearch.bind(this);
    this.renderBooks = this.renderBooks.bind(this);
  }

  async onSearch(query) {
    if (!searchTerms.includes(query)) {
      console.error('Bad search, this term are not supported');
      return;
    }

    const books = await search(query, 20);
    this.setState({ searchedBooks: books });
  }

  renderBooks() {
    const books = this.state.searchedBooks;

    if (!books || books.length === 0)
      return <li className="empty-message">No books on this shelf</li>;

    return books.map(book => (
      <li key={book.id}>
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors}
          coverImage={book.imageLinks.thumbnail}
          onMove={() => {}}
          selectedShelf=""
          shelves={[]}
        />
      </li>
    ));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.onSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
