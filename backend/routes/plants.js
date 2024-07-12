const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");
const plantCtrl = require("../controllers/plants");

router.use(verifyToken);

router.get("/", plantCtrl.index);

router.get("/:plantId", plantCtrl.show);

router.get("/search/:query", plantCtrl.searchPlant);

router.put("/:plantId", plantCtrl.update);

router.post("/", plantCtrl.create);

router.delete("/:plantId", plantCtrl.delete);

// router.post("/comments", plantCtrl.createComment);

// router.delete("/comments/:commentId", plantCtrl.deleteComment);

// router.put("/comments/:commentId", plantCtrl.updateComment);

// router.get("/comments", plantCtrl.commentsIndex);

// router.get("/comments/:commentId", plantCtrl.showComment);

// router.get("/tasks", plantCtrl.tasksIndex);

// router.get("/tasks/:taskId", plantCtrl.showTask);

// router.post("/tasks", plantCtrl.createTask);

// router.delete("/tasks/:taskId", plantCtrl.deleteTask);

// router.put("/tasks/:taskId", plantCtrl.updateTask);

module.exports = router;
