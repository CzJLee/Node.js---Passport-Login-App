const express = require("express");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

const app = express();

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
