const express = require("express");
const app = express();
const genres = require("./routes/genres");
const Joi = require("joi");

app.use(express.json());
app.use('/api/genres', genres)
app.listen(7000, () => {
  console.log("server is running on port 7000");
});

