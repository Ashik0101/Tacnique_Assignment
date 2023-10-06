const mongoose = require("mongoose");

// Define the Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create the Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
