const express = require("express");
const route = express.Router();
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");

route.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

route.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(400).send("The page you requested cannot be found");
  }
  res.send(genre);
});

route.post("/", auth, async (req, res) => {
  try {
    await validate.validateAsync(req.body);
  } catch (err) {
    return res.send(err.details[0].message);
  }
  let genre = new Genre({
    name: req.body.name,
  });

  if (!genre) {
    return res.status(400).send(result.error.details[0].message);
  }

  genre = await genre.save();
  res.send(genre);
});

route.put("/:id", async (req, res) => {
  try {
    await validate(req.body);
  } catch (err) {
    return res.send(err.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    res.status(404).send("We cant find this page");
  }
  res.send(genre);
});

route.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    return res.status(404).send("Sorry, We cant find this movie");
  }

  res.send(genre);
});

module.exports = route;
