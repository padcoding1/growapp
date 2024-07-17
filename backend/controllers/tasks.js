const User = require("../models/user");

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user.tasks);
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
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const task = user.tasks.id(req.params.taskId);
    task.set(req.body);
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
    res.status(204).json({ message: "Task deleted" });
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
};
