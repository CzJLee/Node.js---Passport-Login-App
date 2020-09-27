const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

const app = express();

// EJS Middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
