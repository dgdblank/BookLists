var Models = require('../db/models.js');
var List = Models.List;
var Book = Models.Book;

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

//TODO: Check for duplicates in join table;
  addBook: function(req, res){
    var book = req.body.volumeInfo;

    Book.forge({
      title: book.title, 
      author: book.authors[0]
    })
    .fetch()
    .then(function (foundBook){
      console.log('book in database?', foundBook);
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
        foundBook.related('lists').attach([req.list.id]);
        res.sendStatus(201);
      }ß
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