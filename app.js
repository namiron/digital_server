const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const path = require("path");
const clientUrl = process.env.CLIENT_URL;
const indexRouter = require("./routes/home.routes");
const usersRouter = require("./routes/users.routes");
const laureatesRouter = require("./routes/laureates.routes");

const app = express();

app.use(logger("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", indexRouter);
app.use("/auth", usersRouter);
app.use("/api", laureatesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
module.exports = app;
