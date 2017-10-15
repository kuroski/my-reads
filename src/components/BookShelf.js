import React from 'react';
import Book from './Book';

const BookShelf = () => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        <li>
          <Book
            id="PGR2AwAAQBAJ"
            title="1776"
            authors={['Test author', 'Daniel']}
            onMove={(id, shelve) => console.log(id, shelve)}
            coverImage="http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
          />
        </li>
      </ol>
    </div>
  </div>
);
export default BookShelf;
