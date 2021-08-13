const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

const User = mongoose.model("user", UserSchema);


const inputSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(5).max(1024).required(),
});




exports.UserModel = User ;
exports.validate = inputSchema;