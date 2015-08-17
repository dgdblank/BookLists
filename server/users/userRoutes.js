var userController = require("./userController.js");

module.exports = function (app) {
	// app is userRouter injected form middleware.js
	app.route("/signup")
		.post(userController.signup);

	app.route("/signin")
		.post(userController.signin);

  app.param("userId", userController.getUserById);

  app.post('/:userId/addList', userController.addList);
  app.get('/:userId/getLists', userController.getLists);
  
}