var Models = require('../db/models.js');
var List = Models.List;
var Book = Models.Book;
var _ = require('underscore');

module.exports = {

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

  addBook: function(req, res){
    var book = req.body.volumeInfo;

    Book.forge({
      title: book.title, 
      author: book.authors[0]
    })
    .fetch({withRelated: ['lists']})
    .then(function (foundBook){
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