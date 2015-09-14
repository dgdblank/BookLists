var listController = require("./listController.js");

module.exports = function(app){
	// app is bookRouter injected form middleware.js
  app.param('listId', listController.getListById);

  app.post("/:listId", listController.addBook);
  app.get("/:listId", listController.getBooks);
}