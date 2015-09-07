# BookLists
An application for users to create multiple lists of books from the Google Books API.

The deployed version can be found at: https://simple-booklister.herokuapp.com

## Requirements

- Node 0.10.x
- MYSQL 5.x
- npm 2.10.x

## To run locally:

<b>Step 1:</b> Clone the repo to a local directory on your computer
```
$ git clone https://github.com/dgdblank/Booklists.git
```

<b>Step 2:</b> Install Dependencies
```
$ npm install
```

<b>Step 3:</b> Open a new terminal window to start mySQL and log in
```
$ mysql.server start
$ mysql -u root
```

<b>Step 4:</b> Create a local database called 'booklists' from within mySQL
```
mysql> CREATE DATABASE booklists;
mysql> use booklists;
```

<b>Step 5:</b> Set up your NODE_ENV variable for the development environment
```
run "$export NODE_ENV=development"
```

<b>Step 6:</b> Run server.js from the server directory
```
$ node server/server.js
```

<b>Step 7:</b> Navigate to localhost:5000 and signup for an account!

## Features to Add:
1. Notifications for when books are successfully added to the list.
2. Error messages when user does not have a list or book has already been added. Also, for login and signup.
3. View additional book information upon selection.
4. Removing books form lists
5. Addings books after clicking on a newly created list.
