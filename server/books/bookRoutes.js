var bookController = require("./bookController.js");

module.exports = function(app){
	// app is bookRouter injected form middleware.js
  app.param('listId', bookController.getListById);

  
}