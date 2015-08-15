var express = require("express");
var app = express();

// configure server with middleware and routing
require("./middleware.js")(app, express);

var port = 3000;
app.listen(port, function(){
	console.log("Listening on " + port);
})

module.exports = app;