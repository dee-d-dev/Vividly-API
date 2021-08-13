const express = require("express");
const route = express.Router();
const {Customer, validate} = require("../models/customer")

module.exports = route;



route.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");

  res.send(customer);
});

route.post("/", async (req, res) => {
  try{
    await validate.validateAsync(req.body);
  }catch(error){
    return res.send(error.details[0].message)
  }
  let customer = await Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  if (!customer) {
    return res.status(400).send(error.details[0].message);
  }

  customer = await customer.save();
  res.send(customer);
});

route.put("/:id", async (req, res) => {
    const {error} = validateCustomer(req.body)
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  if (!customer) {
    res.status(404).send("sorry, we can't find this page");

    res.send(customer);
  }
});

route.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) {
    res.send("Sorry we can't find this customer");
  }
  res.send(customer);
});

