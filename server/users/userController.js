var jwt = require("jwt-simple");
var Models = require('../db/models.js');
var User = Models.User;
var Promise = require('bluebird');

module.exports = {
	signup: function(req, res, next){
		var username = req.body.username;
		var password = req.body.password;

		User.forge({ username: username })
			.fetch()
			.then(function (user){
				if (!user){
					return User.forge({
						username: username
					});
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
				next(error);
			});
	},

	signin: function(req, res){

	}
}