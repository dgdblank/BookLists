// Connects the SQL database and creates database tables

var knex;

if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined){
	knex = require("knex")({
		client: "mysql",
		connection: {
			host: "localhost",
			user: "root",
			database: "booklists",
			charset: "utf8"
		}
	});
} else if (process.env.NODE_ENV === "production"){
	knex = require("knex")({
		client: 'mysql',
		connection: process.env.CLEARDB_DATABASE_URL
	});
}


var db = require("bookshelf")(knex);

db.knex.schema.hasTable("users").then(function (exist){
	if (!exist) {
		db.knex.schema.createTable("users", function (user){
			user.increments("id").primary();
			user.string("username", 100).unique();
			user.string("password", 100);
		}).then(function (table){
			console.log("Created USERS table");
		});
	}
});


db.knex.schema.hasTable("lists").then(function (exist){
	if (!exist) {
		db.knex.schema.createTable("lists", function (list){
			list.increments("id").primary();
			list.string("name");
			list.integer("user_id").unsigned().references("users.id");
		}).then(function (table){
			console.log("Created LISTS table");
		});
	}
});

db.knex.schema.hasTable("books").then(function (exist){
	if (!exist) {
		db.knex.schema.createTable("books", function (book){
			book.increments("id").primary();
			book.string("title");
			book.string("author");
			book.string("genre");
			book.integer("pages");
			book.string("thumbnail");
		}).then(function (table){
			console.log("Created BOOKS table");
		});
	}
});

// Join table: Books to Lists
db.knex.schema.hasTable("lists_books").then(function (exist){
	if (!exist) {
		db.knex.schema.createTable("lists_books", function (table){
			table.integer("list_id").unsigned().references("lists.id");
			table.integer("book_id").unsigned().references("books.id");
		}).then(function (table){
			console.log("Created LISTS_BOOKS join table");
		});
	}
});

module.exports = db;
