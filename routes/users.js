const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Import mongoose user model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res, next) => {
	res.render("login");
});

// Register Page
router.get("/register", (req, res, next) => {
	res.render("register");
});

// Register
// Handle Registration Post Requests
router.post("/register", (req, res, next) => {
	// Object destructuring to create variables from the object.
	const { name, email, password, password2 } = req.body;

	// Error checking
	let errors = [];

	// Check required fields
	// If a field is empty
	if (!name || !email || !password || !password2) {
		// Then add a message object to the list of errors
		errors.push({ message: "Please fill in all fields" });
	}

	// Verify that passwords match
	if (password !== password2) {
		errors.push({ message: "Passwords do not match" });
	}

	// Verify that password length is >= 6
	if (password.length < 6) {
		errors.push({ message: "Password must be at least 6 characters" });
	}

	// Check if any errors occurred
	if (errors.length > 0) {
		// An error occurred
		res.render("register", { errors, name, email, password, password2 });
		// When using a render engine, we can pass in values
		// Pass the values, and then pass the previously entered values so that the form does not clear
	} else {
		// Everything is correct, validation passes
		// Use the mongoose model to insert a User
		// Check that the user does not already exist
		// This returns a promise.
		User.findOne({ email: email }).then((user) => {
			if (user) {
				// This user already exists
				// Re-render the register form, and send an error
				errors.push({ message: "Email is already registered" });
				res.render("register", {
					errors,
					name,
					email,
					password,
					password2,
				});
			} else {
				// User does not already exist
				// Create a new user from User model
				const newUser = new User({
					name,
					email,
					password,
				});

				// Hash the password, salt length is 10.
				bcrypt.hash(password, 10, (error, hash) => {
					if (error) {
						throw error;
					}

					// Update the newUser password with the hashed password
					newUser.password = hash;

					// Save the newUser in the DB
					newUser
						.save()
						.then((user) => {
							console.log(
								`Successfully added user ${email} to database.`
							);
							// Flash a success_msg with the message "You are now registered"
							req.flash(
								"success_msg",
								"You are now registered and can log in"
							);
							res.redirect("/users/login");
						})
						.catch((error) => console.log(error));
				});
			}
		});
	}
});

// Login
// Handle Login Post requests
// http://www.passportjs.org/docs/authenticate/
router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/users/login",
		failureFlash: true,
	})(req, res, next);
});

// Handle logout button
router.get("/logout", (req, res, next) => {
	req.logout();
	req.flash("success_msg", "You have successfully logged out");
	res.redirect("/users/login");
});

module.exports = router;
