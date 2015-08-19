var jwt = require("jwt-simple");
// var Promise = require('bluebird');
var Models = require('../db/models.js');
var Collections = require('../db/collections.js');
var User = Models.User;
var List = Models.List;
var Lists = Collections.Lists;

var secret = "MYWITTYSECRET";

module.exports = {
	
	// Gets the user by the id passed in API call
	// and sends it to the next method
	getUserById: function(req, res, next, userId){
		User.forge({id: userId})
			.fetch()
			.then(function (user){
				if(!user){
					throw new Error('user not found');
				}
				req.user = user;
				next();
			})
			.catch(function (error){
				console.log(error);
			})
	},

	// Adds the list to database according to user
	addList: function(req, res) {
		var name = req.body.name;
		
		List.forge({ 
			name: name,
			user_id: req.user.id
		})
			.save()
			.then(function (list) {
				if (!list) {
					throw new Error('Error creating list');
				}
			res.sendStatus(201);	
			})
			.catch(function (error) {
				console.log(error);
			});

	},

	// Fetches the user's lists
	getLists: function(req, res){
		Lists.query("where", "user_id", "=", req.user.id)
		.fetch()
		.then(function (lists){
			if(!lists){
				throw new Error('user does not have any lists');
			}
			res.json(lists);
		})
		.catch(function (error){
			console.log(error);
		});
	},

	// Adds the user to the database and sends back a token.
	signup: function(req, res){
		var username = req.body.username;
		var password = req.body.password;

		User.forge({ username: username })
			.fetch()
			.then(function (user){
				if (!user){
					return User.forge({
						username: username
					})
					.save();
				} else {
					throw new Error('User already exists.');
				}
			})
			.then(function (newUser){
				return newUser.hashPassword(password);
			})
			.then(function (user){
				if (!user){
					throw new Error('User creation failed.');
				}
				res.json({
					token: jwt.encode(user, secret),
					userId: user.id
				});
			})
			.catch(function (error){
				console.log(error);
			});
	},

	// Checks that the user is in the database and sends back a token
	signin: function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		var foundUser;

		User.forge({ username: username })
			.fetch()
			.then(function (user){
				if(!user){
					throw new Error('User does not exist. Go sign up.');
				}
				foundUser = user;
				return user.comparePassword(password);
			})
			.then(function (passwordMatch){
				if(!passwordMatch){
					throw new Error('Incorrect password.');
				}
				res.json({
					token: jwt.encode(foundUser, secret),
					userId: foundUser.id
				})
			})
			.catch(function (error){
				console.log(error);
			});
	}
}