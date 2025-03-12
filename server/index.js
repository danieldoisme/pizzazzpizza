const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
  res.send("Hello from the PizzazzPizza server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
