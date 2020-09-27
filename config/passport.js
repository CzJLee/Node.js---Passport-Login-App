const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load in mongoose User model
const User = require("../models/User");

// Create a passport local strategy
module.exports = function (passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			(email, password, done) => {
				// Check to see if there exists a user in the db with the provided email
				User.findOne({ email: email })
					.then((user) => {
						if (!user) {
							// There is no match
							return done(null, false, {
								message: "That email is not registered",
							});
						} else {
							// The username exists in the database
							// Use bcrypt to compare the passwords
							bcrypt.compare(
								password,
								user.password,
								(error, isMatch) => {
									if (error) {
										throw error;
									}

									if (isMatch) {
										// Password matches
										return done(null, user);
									} else {
										// Password does not match
										return done(null, false, {
											message: "Password is incorrect",
										});
									}
								}
							);
						}
					})
					.catch((error) => console.log(error));
			}
		)
	);
	
	// http://www.passportjs.org/docs/configure/
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};
