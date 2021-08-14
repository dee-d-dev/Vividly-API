const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const _ = require('lodash');
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
  try{
    await validate.validateAsync(req.body);
  }catch(error){
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  //check if user exists
  if (user) return res.status(400).send("user has already been registered");

  
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)

  await user.save();

  res.send(_.pick(user,['_id','name', 'email']))
});

module.exports = router; 