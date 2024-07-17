const User = require("../models/user");

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const tasks = user.tasks;
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const task = req.body;
    user.tasks.push(task);
    await user.save();
    res.status(201).json(user.tasks[user.tasks.length - 1]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.params.taskId);
    task.name = req.body.name;
    task.description = req.body.description;
    task.interval = req.body.interval;
    task.timeOfDay = req.body.timeOfDay;
    await user.save();
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.tasks.remove(req.params.taskId);
    await user.save();
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const showTask = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.params.taskId);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  index,
  create,
  update,
  delete: deleteTask,
  showTask,
};
