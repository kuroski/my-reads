import React from 'react';
import createReactClass from 'create-react-class';
import { Link, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import Shelves from '../components/Shelves';
import { getAll, update } from '../api';
import { shelves } from '../common/commonData';
import './App.css';

const App = createReactClass({
  getInitialState: () => ({
    shelves: shelves.shelves,
    books: []
  }),

  componentDidMount: async function() {
    const books = await getAll();
    this.setState({ books });
  },

  onMove: async function(bookToChange, destinyShelf) {
    await update(bookToChange, destinyShelf);

    this.setState(prevState => {
      let book = prevState.books.find(book => book.id === bookToChange.id);
      if (book) book.shelf = destinyShelf;
      else {
        bookToChange.shelf = destinyShelf;
        prevState.books.push(bookToChange);
      }

      return {
        books: prevState.books
      };
    });
  },

  render: function() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchPage shelves={this.state.shelves} onMove={this.onMove} />
          )}
        />
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
});

export default App;
