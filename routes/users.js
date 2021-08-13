const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  try{
    await validate.validateAsync(req.body);
  }catch(error){
    return res.status(400).send(error.details[0].message);
  }

  let user = await userModel.findOne({ email: req.body.email });

  //check if user exists
  if (user) return res.status(400).send("user has already been registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  res.send(user)
});

module.exports = router; 