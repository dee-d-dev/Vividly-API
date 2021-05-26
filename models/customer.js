const mongoose = require('mongoose')
const Joi = require("joi");


const { Schema } = mongoose;

const customerSchema = Schema({
  name: { type: String, minlength: 5, required: true },
  phone: { type: Number, minlength: 8, required: true },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);


async function validateCustomer(customer) {
  const Schema = Joi.object({
    name: Joi.string().min(5).required(),
    phone: Joi.number.number().min(11).max(11).required(),
    isGold: Joi.boolean(),
  });

  await Schema.validateAsync(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;