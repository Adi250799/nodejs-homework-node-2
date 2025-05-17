const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
