const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Pizza = require("./models/Pizza");
const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// MongoDB Connection
const uri =
  "mongodb+srv://danieldoisme:iLPC0nPeN9xbcbQC@pizzazzpizzadb.0ejvq.mongodb.net/?retryWrites=true&w=majority&appName=pizzazzpizzaDB";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Endpoints

// Create a new pizza
app.post("/api/pizzas", async (req, res) => {
  try {
    const newPizza = new Pizza(req.body);
    const savedPizza = await newPizza.save();
    res.status(201).json(savedPizza); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Retrieve all pizzas
app.get("/api/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Retrieve a single pizza by ID
app.get("/api/pizzas/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "Cannot find pizza" }); // 404 Not Found
    }
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Update an existing pizza
app.put("/api/pizzas/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pizza) {
      return res.status(404).json({ message: "Cannot find pizza" }); // 404 Not Found
    }
    res.json(pizza);
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Delete a pizza
app.delete("/api/pizzas/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "Cannot find pizza" }); // 404 Not Found
    }
    res.json({ message: "Pizza deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the PizzazzPizza server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
