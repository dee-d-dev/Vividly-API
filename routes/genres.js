const express = require("express");
const route = express.Router();
const { Genre, validate } = require("../models/genre");

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

route.post("/", async (req, res) => {
  let genre = new Genre({
    name: req.body.name,
  });
  const { error } = validate(req.body);

  if (!genre) {
    return res.status(400).send(result.error.details[0].message);
  }

  genre = await genre.save();
  res.send(genre);
});

route.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (!genre) {
    res.status(404).send("We cant find this page");
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

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
