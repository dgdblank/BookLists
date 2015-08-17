var db = require("./config.js");
var Promise = require("bluebird");
var bcrypt = Promise.promisifyAll(require("bcrypt"));

var User = exports.User = db.Model.extend({
	tableName: "users",

	hashPassword: function(password) {
		var user = this;

		return bcrypt.hashAsync(password, 10)
			.then(function (hash, err){
				if(err){
					throw new Error(err);
				}
				user.set('password', hash);
				user.save();
			})
			.then(function (){
				return user;
			})
			.catch(function (err){
				throw new Error(err);
			});
	},

	comparePassword: function(passwordAttempt) {
		return bcrypt.compareAsync(passwordAttempt, this.get("password"));
	},

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

// var Type = exports.Type = db.Model.extend({
// 	tableName: "types",

// 	lists: function() {
// 		return this.hasMany(List, "list_type_id");
// 	}
// })