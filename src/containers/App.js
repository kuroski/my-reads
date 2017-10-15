import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SearchPage from './SearchPage';
import Shelves from '../components/Shelves';
import { testShelves } from '../common/testData';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelves: testShelves.shelves
    };

    this.onMove = this.onMove.bind(this);
  }

  onMove(id, origin, destiny) {
    console.log(id, origin, destiny);
    const originShelf = this.state.shelves.find(
      shelf => shelf.value === origin
    );
    const book = originShelf.books.find(book => book.id === id);
    const destinyShelf = this.state.shelves.find(
      shelf => shelf.value === destiny
    );

    console.log(book);
    console.log(originShelf);
    console.log(destinyShelf);

    this.setState(prevState => {
      return {
        shelves: prevState.shelves.map(shelve => {
          shelve.books = shelve.books.map(book => {});
          return shelve;
        })
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
                <Shelves shelves={this.state.shelves} onMove={this.onMove} />
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
