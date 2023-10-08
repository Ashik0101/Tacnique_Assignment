const express = require("express");
const {
  addTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/TaskController");

const taskRouter = express.Router();

taskRouter.post("/", addTask);
taskRouter.get("/", getAllTasks);
taskRouter.get("/:taskId", getTaskById);
taskRouter.put("/:taskId", updateTaskById);
taskRouter.delete("/:taskId", deleteTaskById);

module.exports = { taskRouter };
