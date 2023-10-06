const Joi = require("joi");
const { Task } = require("../models/Task");

// Controller to add a new task
const addTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validate the request body using Joi
    const taskSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().valid("pending", "completed").default("pending"),
    });

    const { error } = taskSchema.validate({
      title,
      description,
      status,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new task based on the validated request body
    const newTask = new Task(req.body);

    // Save the new task to the database
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task Created Successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Controller to retrieve all tasks for a specific user
const getAllTasks = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const userId = req.body.user;

    // Find all tasks associated with the user
    const tasks = await Task.find({ user: userId });

    if (tasks.length === 0) {
      return res.status(200).json({ message: "No Task Available" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addTask,
  getAllTasks,
};
