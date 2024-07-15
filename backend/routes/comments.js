const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");
const commentCtrl = require("../controllers/comments");

router.use(verifyToken);

router.post("/", commentCtrl.create);

router.delete("/:commentId", commentCtrl.delete);

router.put("/:commentId", commentCtrl.update);

router.get("/", commentCtrl.index);

module.exports = router;
