const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // URL to the pizza image
    required: false, // Image is not strictly required
  },
  ingredients: {
    type: [String], // Array of ingredients
    required: true,
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
