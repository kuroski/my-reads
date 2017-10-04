[![Build Status](https://travis-ci.org/kuroski/my-reads.svg?branch=master)](https://travis-ci.org/kuroski/my-reads)
[![Code Climate](https://codeclimate.com/github/kuroski/my-reads/badges/gpa.svg)](https://codeclimate.com/github/kuroski/my-reads)
[![Test Coverage](https://codeclimate.com/github/kuroski/my-reads/badges/coverage.svg)](https://codeclimate.com/github/kuroski/my-reads/coverage)
[![Dependency Status](https://david-dm.org/kuroski/my-reads/status.svg)](https://david-dm.org/kuroski/my-reads#info=dependencies)
[![devDependency Status](https://david-dm.org/kuroski/my-reads/dev-status.svg)](https://david-dm.org/kuroski/my-reads#info=devDependencies)

# MyReads Project

Udacity's my-reads projects

## Installing

```
yarn install
yarn start
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
