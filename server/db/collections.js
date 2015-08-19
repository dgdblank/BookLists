var db = require("./config.js");
var Models = require("./models.js");

var Users = exports.Users = db.Collection.extend({
	model: Models.User
});

var Lists = exports.Lists = db.Collection.extend({
	model: Models.List
});

var Books = exports.Books = db.Collection.extend({
	model: Models.Book
});
