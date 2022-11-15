const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
require("dotenv").config();

const reservasRouter = require("./routes/reservas");
const sessionRouter = require("./routes/users");

const app = express();

const { connect } = require("./db/db");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/reservas", reservasRouter);
app.use("/users", sessionRouter);

connect();

module.exports = app;
