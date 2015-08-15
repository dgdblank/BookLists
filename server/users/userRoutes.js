var userController = require("./userController.js");

module.exports = function (app) {
	// app is userRouter injected form middleware.js

	app.route("/signup")
		.post(userController.signin);

	app.route("/signin")
		.post(userController.signup);

}