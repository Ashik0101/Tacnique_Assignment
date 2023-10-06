const express = require("express");
const { addTask, getAllTasks } = require("../controllers/TaskController");

const taskRouter = express.Router();

taskRouter.post("/task", addTask);
taskRouter.get("/task", getAllTasks);

module.exports = { taskRouter };
