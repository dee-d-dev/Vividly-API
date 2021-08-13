const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const Joi = require("joi");
const app = express();
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to database successfully"))
  .catch((err) => console.log(`cannot connect because of this: ${err}`));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

app.listen(7000, () => {
  console.log("server is running on port 7000");
});
