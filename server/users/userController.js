var jwt = require("jwt-simple");
var Models = require('../db/models.js');
var User = Models.User;
var Promise = require('bluebird');

var secret = "MYWITTYSECRET";

module.exports = {
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
					token: jwt.encode(user, secret)
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
					token: jwt.encode(foundUser, secret)
				})
			})
			.catch(function (error){
				console.log(error);
			});

	}
}