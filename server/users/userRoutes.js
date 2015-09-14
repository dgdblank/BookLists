var userController = require("./userController.js");

module.exports = function (app) {
	// app is userRouter injected form middleware.js
	app.route("/new")
		.post(userController.signup);

	app.route("/session")
		.post(userController.signin);

  app.param("userId", userController.getUserById);

  app.post('/:userId', userController.addList);
  app.get('/:userId', userController.getLists);  
}