// Add as middleware this to any route we want to protect
module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash("error_msg", "Please log in to view the dashboard");
		res.redirect("/users/login");
	},
};
