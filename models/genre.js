const mongoose = require("mongoose");
const Joi = require("joi");


const { Schema } = mongoose;


const GenreSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
});

const Genre = mongoose.model("Genre", GenreSchema);


async function validateGenre(genre) {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  await Schema.validateAsync(genre);
}

exports.validate = validateGenre;
exports.Genre = Genre