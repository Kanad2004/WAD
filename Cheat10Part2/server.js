const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;

// MongoDB connection URL
const url =
  "mongodb+srv://kanadkulkarni2013:Kanad2004@cluster0.qnfzl.mongodb.net/todo";

// Connect to MongoDB using Mongoose
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch((err) => console.error("Mongoose connection error:", err));

// Define Task Schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema, "tasks");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task({ text: req.body.text });
    const result = await task.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task (toggle completion)
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    task.completed = !task.completed;
    const result = await task.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Task not found" });
    res.json({ deletedId: result._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
