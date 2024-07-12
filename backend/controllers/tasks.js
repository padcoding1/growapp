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

module.exports = {
  index,
};
