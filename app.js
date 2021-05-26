const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers")
const Joi = require("joi");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly",{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('connected to database successfully'))
  .catch((err) => console.log(`cannot connect because of this: ${err}`));

app.use(express.json());
app.use("/api/genres", genres);
app.use("api/customers", customers);
app.listen(7000, () => {
  console.log("server is running on port 7000");
});
