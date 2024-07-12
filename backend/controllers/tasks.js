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
    const task = {
      name: req.body.name,
      description: req.body.description,
    };
    user.tasks.push(task);
    await user.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  index,
  create,
};
