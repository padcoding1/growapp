const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");
const taskCtrl = require("../controllers/tasks");

router.use(verifyToken);

router.get("/", taskCtrl.index);

module.exports = router;
