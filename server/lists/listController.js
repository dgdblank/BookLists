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

  addBook: function(req, res){
    console.log("got to add book");
    console.log('list', req.list);
    console.log('book', req.body);
    // add the book to book table
    // add book and list to join table
    // return 200 code
  }

};