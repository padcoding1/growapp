const User = require("../models/user");

const createComment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const comment = {
      text: req.body.text,
    };
    user.comments.push(comment);
    await user.save();
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
};
