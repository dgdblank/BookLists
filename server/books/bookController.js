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
  }

};