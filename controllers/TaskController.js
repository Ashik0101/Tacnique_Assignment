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

// Controller to retrieve a specific task by ID
const getTaskById = async (req, res) => {
  try {
    // Get the task ID from the URL parameters
    const taskId = req.params.taskId;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    // Check if the user is the task creator
    if (task.user.toString() !== req.body.user) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    res.status(200).json({ task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Controller to update a specific task by ID
const updateTaskById = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    // Get the task ID from the URL parameters
    const taskId = req.params.taskId;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    // Joi schema for validating the request data
    const taskUpdateSchema = Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.string().valid("pending", "completed"),
    });

    // Validate and update task data
    const { error } = taskUpdateSchema.validate({
      title,
      description,
      status,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user is the task creator
    if (task.user.toString() !== req.body.user) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    // Update task fields based on the request body
    if (req.body.title) {
      task.title = req.body.title;
    }
    if (req.body.description) {
      task.description = req.body.description;
    }
    if (req.body.status) {
      task.status = req.body.status;
    }

    await task.save();

    res.status(200).json({ message: "Task Updated Successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Controller to delete a specific task by ID
const deleteTaskById = async (req, res) => {
  try {
    // Get the task ID from the URL parameters
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    // Check if the user is the task creator (optional)
    if (task.user.toString() !== req.body.user) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    // Delete the task
    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
