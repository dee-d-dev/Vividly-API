const express = require('express')
const route = express.Router()


const genres = [
  {
    id: 1,
    genre: "Action",
  },
  {
    id: 2,
    genre: "Sci-Fi",
  },
  {
    id: 3,
    genre: "Comedy",
  },
];

route.get("/", (req, res) => {
  res.send("Welcome to Genre API");
});

route.get("/", (req, res) => {
  res.send(genres);
});

route.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  if (!genre) {
    return res.status(400).send("The page you requested cannot be found");
  }
  res.send(genre);
});

route.post("/", (req, res) => {
  const schema = Joi.object({
    genre: Joi.string().min(2).required(),
  });

  const result = schema.validate({ genre: req.body.genre });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };

  genres.push(genre);
  res.send(genre);
});

route.put("/:id", (req, res) => {
  const newGenre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!newGenre) {
    res.status(404).send("We cant find this page");
  }
  const schema = Joi.object({
    genre: Joi.string().min(2).required(),
  });

  const result = schema.validate({ genre: req.body.genre });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  newGenre.genre = req.body.genre;
  res.send(newGenre);
});

route.delete("/:id", (req, res) => {
  const delItem = genres.find((g) => g.id === parseInt(req.params.id));

  if (!delItem) {
    return res.status(404).send("Sorry, We cant find this movie");
  }

  const index = genres.indexOf(delItem);
  genres.splice(index, 1);

  res.send(delItem);
});

module.exports = route;
 