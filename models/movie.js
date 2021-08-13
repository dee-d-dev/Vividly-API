const Joi = require("joi");
const mongoose = require("mongoose");
const { GenreSchema } = require("./genre");
Joi.objectId = require('joi-objectid')(Joi)

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: GenreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);


const inputSchema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  genreId: Joi.objectId().required(),
  numberInStock: Joi.number().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
});


exports.Movie = Movie;
exports.validate = inputSchema;