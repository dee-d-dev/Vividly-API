const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const movies = require("./routes/movies");
const auth = require("./routes/auth");
const Joi = require("joi");
const app = express();
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");
require("express-async-errors");
const winston = require("winston");




if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: JWT not defined");
  process.exit(1);
}
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to database successfully"))
  .catch((err) => console.log(`cannot connect because of this: ${err}`));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/auth", auth);

 

app.listen(7000, () => {
  console.log("server is running on port 7000");
});
