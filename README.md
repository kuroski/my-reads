[![Build Status](https://travis-ci.org/kuroski/my-reads.svg?branch=master)](https://travis-ci.org/kuroski/my-reads)
[![Code Climate](https://codeclimate.com/github/kuroski/my-reads/badges/gpa.svg)](https://codeclimate.com/github/kuroski/my-reads)
[![Test Coverage](https://codeclimate.com/github/kuroski/my-reads/badges/coverage.svg)](https://codeclimate.com/github/kuroski/my-reads/coverage)
[![Dependency Status](https://david-dm.org/kuroski/my-reads/status.svg)](https://david-dm.org/kuroski/my-reads#info=dependencies)
[![devDependency Status](https://david-dm.org/kuroski/my-reads/dev-status.svg)](https://david-dm.org/kuroski/my-reads#info=devDependencies)

# MyReads Project

A bookshelf management app written in React.

Kuroski - Udacity's my-reads project.

## Table of Contents

- [What It Is](#what)
- [Installing](#installing)
- [Testing](#testing)
- [Deploying](#deployment)

## What

First project submission of the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019).

Is a library management app that keeps track of what books you're reading. 

[A live demo is available here](https://kuroski-my-reads.herokuapp.com/).

## Installing

- Clone project, then:

```
yarn install
yarn start
```

or

```
npm install
npm start
```

## Testing
The app has a full test suite written in Jest & Enzyme that can be run
with ```yarn|npm test```. 

A coverage report can be generated with ```yarn|npm coverage```.

The repo has CI set up with Travis and Codeclimate that will automagically run the test suite & generate a coverage report on each git push.

## Deployment
The app has continuous deployment to Heroku on each successful (CI-passing) build of the
master branch. The latest passing build is at [kuroski-my-reads.herokuapp.com/](https://kuroski-my-reads.herokuapp.com/).

For manual deployment, you can ```yarn build```, and then deploy the built app on any webserver of your choice.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
