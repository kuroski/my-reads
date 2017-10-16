import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import Shelves from '../components/Shelves';
import { testBooks, testShelves } from '../common/testData';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: testShelves.shelves,
      books: testBooks.books
    };

    this.onMove = this.onMove.bind(this);
  }

  onMove(bookId, destinyShelf) {
    this.setState(prevState => {
      const book = prevState.books.find(book => book.id === bookId);
      book.shelf = destinyShelf;
      return {
        books: prevState.books
      };
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchPage />} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelves
                  shelves={this.state.shelves}
                  books={this.state.books}
                  onMove={this.onMove}
                />
              </div>

              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
