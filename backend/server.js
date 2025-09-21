//server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModel = require("./models/taskmangment");
const URL = ""; //YOUR MONGODB URL HERE
var app = express();
app.use(cors());
app.use(express.json());

// Connect to your MongoDB database
mongoose.connect(URL);

// Check for database connection errors
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Get saved tasks from the database
app.get("/getTaskList", (req, res) => {
  TaskModel.find({})
    .then((taskList) => res.json(taskList))
    .catch((err) => res.json(err));
});

// Add new task to the database
app.post("/addTaskList", (req, res) => {
  TaskModel.create({
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  })
    .then((task) => res.json(task))
    .catch((err) => res.json(err));
});

// Update task fields (including deadline)
app.post("/updateTaskList/:id", (req, res) => {
  const id = req.params.id;
  const updateData = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  };
  TaskModel.findByIdAndUpdate(id, updateData)
    .then((task) => res.json(task))
    .catch((err) => res.json(err));
});

// Delete task from the database
app.delete("/deleteTaskList/:id", (req, res) => {
  const id = req.params.id;
  TaskModel.findByIdAndDelete({ _id: id })
    .then((task) => res.json(task))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server running on 3001");
});
