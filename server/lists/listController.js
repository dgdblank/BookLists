var Models = require('../db/models.js');
var List = Models.List;
var Book = Models.Book;

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
    var author = book.authors ? book.authors[0] : null;
    var genre = book.categories ? book.categories[0] : null;

    // Checks if the book already exists in the database 
    // and if it has already been added to the specified list
    Book.forge({
      title: book.title, 
      author: author
    })
    .fetch( {withRelated: ['lists', {'lists': function(qb) {
          qb.where('lists.id', '=', req.list.id);
        }
      }]
    })
    .then(function (foundBook){
      // if the book is not in the database,
      // add it and attach it to the join table
      if(!foundBook){
        Book.forge({
          title: book.title, 
          author: author,
          genre: genre,
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
        var lists = foundBook.related('lists').toJSON();
        if(lists.length === 0){
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