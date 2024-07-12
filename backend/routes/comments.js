const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");
const commentCtrl = require("../controllers/comments");

router.use(verifyToken);

router.post("/", commentCtrl.createComment);

// router.delete("/comments/:commentId", plantCtrl.deleteComment);

// router.put("/comments/:commentId", plantCtrl.updateComment);

// router.get("/comments", plantCtrl.commentsIndex);

// router.get("/comments/:commentId", plantCtrl.showComment);

module.exports = router;
