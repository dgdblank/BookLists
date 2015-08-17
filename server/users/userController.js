var jwt = require("jwt-simple");
var Models = require('../db/models.js');
var User = Models.User;
var List = Models.List;
var Promise = require('bluebird');

var secret = "MYWITTYSECRET";

module.exports = {
	
	getUserById: function(req, res, next, userId){
		console.log('getUserById invoked');
		console.log(userId);
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

	addList: function(req, res) {
		console.log('invoked addList: user = ', req.user);
		console.log('req.body =', req.body);
		var name = req.body.name;
		var type = req.body.type;
		List.forge({ 
			name: name,
			type: type,
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