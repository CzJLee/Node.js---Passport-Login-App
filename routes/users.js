const express = require("express");
const router = express.Router();

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
	console.log(req.body);

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
		res.send("pass");
	}
});

module.exports = router;
