const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");
require("express-async-errors");
const winston = require("winston");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();


const server = app.listen(7000, () => {
  console.log("server is running on port 7000");
});

module.exports = server;