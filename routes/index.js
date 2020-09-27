const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", (req, res, next) => {
	res.render("welcome");
});

// Dashboard view
// Add in the auth to protect this route
router.get("/dashboard", ensureAuthenticated, (req, res, next) => {
	res.render("dashboard", {
		name: req.user.name,
	});
	// Pass in user object to show user name on dashboard
});

module.exports = router;
