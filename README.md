# MyDiary
[![Build Status](https://travis-ci.org/izzett222/mydiary-website.svg?branch=develop)](https://travis-ci.org/izzett222/mydiary-website)
[![codecov](https://codecov.io/gh/izzett222/mydiary-website/branch/develop/graph/badge.svg)](https://codecov.io/gh/izzett222/mydiary-website)
[![Maintainability](https://api.codeclimate.com/v1/badges/ac0dfce331cda0b62e07/maintainability)](https://codeclimate.com/github/izzett222/mydiary-website/maintainability)

_MyDiary is an online journal where users can pen down their thoughts and feelings._
## links
* [back-end app](mydiary-izzeddin.herokuapp.com)
* [front-end pages](izzett222.github.io/mydiary-website)
* [pivotal tracker stories](https://www.pivotaltracker.com/n/projects/2402203)

## Features

1.  User can sign up
2.  User can sign in
3.  User can view all entries in their diary
4.  User can delete an entry
5.  User can modify an entry
6.  User can create an entry
7.  User can view an individual entry in their diary

## API endpoint available

| Method      | Path                                                           | Action                         |
|-------------|----------------------------------------------------------------|--------------------------------|
| POST        | /api/v1/users/signup                                           | sign up a User                 |
| POST        | /api/v1/users/signin                                           | login a User                   |
| POST        | /api/v1/entries                                                | Create an entry                |
| PATCH       | /api/v1/entries/id                                             | Modify an entry                |
| DELETE      | /api/v1/entries/id                                             | Delete an entry                |
| GET         | /api/v1/entries                                                | View all entries               |
| GET         | /api/v1/entries/id                                             | View a specific entry          |

## Prerequisites
### Bank-End
* Node
* Express
* Mocha
* Chai
* Travis CI
* Code climate
* Joi
* Babel
* Eslint
### Front-End
* JavaScript
* HTML
* CSS

## get started with the project
* Clone this repo using this [link](https://github.com/izzett222/mydiary-website)
* install all dependencies using 
    `npm install`
* Start Server using
    `npm run dev`
* run test by running
    `npm run test`
## BUGS
If you discover any bug please visit this [link](https://github.com/izzett222/mydiary-website/issues) to report it or 
contact me through my email _`iizzeddin62@gmail.com`_
## AUTHOR
ISHIMWE SERGE IZZEDDIN



***
