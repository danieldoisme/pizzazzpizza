const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Pizza = require("./models/Pizza");
const Order = require("./models/Order");
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

// Create a new order
app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder); // 201 Created
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

// Retrieve all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.pizza"); // Populate the pizza information for each item
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Retrieve a single order by ID
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.pizza"); // Populate the pizza information for each item
    if (!order) {
      return res.status(404).json({ message: "Cannot find order" }); // 404 Not Found
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
});

// Update an existing order (e.g., update status)
app.put("/api/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("items.pizza"); // Populate the pizza information for each item
    if (!order) {
      return res.status(404).json({ message: "Cannot find order" }); // 404 Not Found
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 Bad Request
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the PizzazzPizza server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
