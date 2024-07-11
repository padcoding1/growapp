const User = require("../models/user");
const plantService = require("../services/plantService");

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.plants);
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index };
