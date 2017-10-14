import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SearchPage from './SearchPage';
import Shelves from './Shelves';
import './App.css';

class App extends Component {
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
                <Shelves />
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
