const mongoose = require("mongoose");
const Joi = require("joi");


const { Schema } = mongoose;


const GenreSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60
  },
});

const Genre = mongoose.model("Genre", GenreSchema);



const inputSchema = Joi.object({
  name: Joi.string().min(3).required(),
});


exports.validate = inputSchema;
exports.Genre = Genre;
exports.GenreSchema = GenreSchema