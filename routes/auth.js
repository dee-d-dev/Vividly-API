const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    await validateSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  //check if user exists
  if (!user) return res.status(400).send("Invalid email or password");

  //comparing password
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password");

  //jwt

  const token = user.generateAuthToken();
  res.send(token);
});

const validateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(1024).required(),
});

module.exports = router;
