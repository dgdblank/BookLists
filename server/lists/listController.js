var Models = require('../db/models.js');
var List = Models.List;
var Book = Models.Book;
var _ = require('underscore');

module.exports = {

  // Gets the list by the id passed to the server
  // then passes it to the next method.
  getListById: function(req, res, next, listId){
    List.forge({id: listId})
      .fetch()
      .then(function (list){
        if(!list){
          throw new Error('list not found');
        }
        req.list = list;
        next();
      })
      .catch(function (error){
        console.log(error);
      })
  },

 // Adds the book to the database and the lists_books join table
  addBook: function(req, res){
    var book = req.body.volumeInfo;

    // Checks if the book already exists in the database 
    // and if it has already been added to the specified list
    Book.forge({
      title: book.title, 
      author: book.authors[0]
    })
    .fetch({withRelated: ['lists']}) // TO DO: Query by list/book relationship in join table
    .then(function (foundBook){
      // if the book is not in the database,
      // add it and attach it to the join table
      if(!foundBook){
        Book.forge({
          title: book.title, 
          author: book.authors[0],
          genre: book.categories[0],
          pages: book.pageCount,
          thumbnail: book.imageLinks.thumbnail
        })
        .save()
        .then(function (newBook){
          newBook.related('lists').attach([req.list.id]);
          res.sendStatus(201);
        })
      } else {
        // if the book is in the database, but not attached to the list,
        // add the relationship to the join table

        // TO DO: CHANGE TO QUERY
        var lists = foundBook.related('lists').toJSON();
        var everyTest = _.every(lists, function(list){
          if(list.id !== req.list.id){
            return true;
          }
        })
        if(everyTest){
          foundBook.related('lists').attach([req.list.id]);
          res.sendStatus(201);
        } else {
          throw new Error('Book has already been added to that list');
        }
      }
    })
    .catch(function (error){
      console.log(error);
    });
  },

  // Gets the books according to list selected
  getBooks: function(req, res){
    List.forge({
      id: req.list.id
    })
    .fetch({withRelated: ['books']})
    .then(function (list){
      if(!list){
        throw new Error('list cannot be found');
      }
      res.json({
        list: list,
        books: list.related('books')
      });
    })
    .catch(function (error){
      console.log(error);
    });
  }

};