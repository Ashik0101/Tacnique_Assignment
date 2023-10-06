const express = require("express");
const {
  addTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/TaskController");

const taskRouter = express.Router();

taskRouter.post("/task", addTask);
taskRouter.get("/task", getAllTasks);
taskRouter.get("/task/:taskId", getTaskById);
taskRouter.put("/task/:taskId", updateTaskById);
taskRouter.delete("/task/:taskId", deleteTaskById);

module.exports = { taskRouter };
