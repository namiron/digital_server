const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
    origin: clientUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", indexRouter);
app.use("/auth", usersRouter);
app.use("/api", laureatesRouter);

module.exports = app;
