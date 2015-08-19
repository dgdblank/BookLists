var express = require("express");
var app = express();

// configure server with middleware and routing
require("./middleware.js")(app, express);

// serve static files
app.use(express.static(__dirname + "/../client/www"));

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function(){
	console.log("Listening on " + app.get("port"));
})

module.exports = app;