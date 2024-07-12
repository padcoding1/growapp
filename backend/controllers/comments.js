const User = require("../models/user");

const create = async (req, res) => {
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

const deleteComment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.comments.remove(req.params.commentId);
    await user.save();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user.comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const comment = user.comments.id(req.params.commentId);
    comment.text = req.body.text;
    await user.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  delete: deleteComment,
  index,
  update,
};
