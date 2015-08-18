var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function (app, express){

	// logs http requests
	app.use(morgan("dev"));
	
	// Create routers with individual configurations
	var userRouter = express.Router();
	var listRouter = express.Router();

	// parses body of http request
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.use("/users", userRouter); // user router for all user requests
	app.use("/lists", listRouter); // list router for all book requests

	//inject the routers into their router files
	require("./users/userRoutes.js")(userRouter);
	require("./lists/listRoutes.js")(listRouter);
};