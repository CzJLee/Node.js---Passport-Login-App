const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
// DB Config
const db = require("./config/keys").MongoURI;

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	// (node:18781) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
	.then(console.log("MongoDB Connected."))
	.catch((Error) => console.log(error));

const app = express();

// EJS Middleware
// EJS needs Express EJS layouts to render correctly.
// This middleware tell res.render to use the ejs view engine
// https://expressjs.com/en/4x/api.html#res.render
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
