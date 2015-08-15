var db = require("./config.js");
var bcrypt = require("bcrypt-nodejs");
var Promise = require("bluebird");

var User = exports.User = db.Model.extend({
	tableName: "users",

	lists: function() {
		return this.hasMany(List, "user_id");
	}
});

var List = exports.List = db.Model.extend({
	tableName: "lists",

	books: function() {
		return this.belongsToMany(Book, 'lists_books');
	}
});

var Book = exports.Book = db.Model.extend({
	tableName: "books",

	lists: function() {
		return this.belongsToMany(List, "lists_books");
	}
});

var Type = exports.Type = db.Model.extend({
	tableName: "types",

	lists: function() {
		return this.hasMany(List, "list_type_id");
	}
})