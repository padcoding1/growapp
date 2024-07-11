const express = require("express");
const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/verify-token");
const plantCtrl = require("../controllers/plants");

router.use(verifyToken);

router.get("/", plantCtrl.index);

router.get("/:plantId", plantCtrl.show);

router.post("/", plantCtrl.create);

router.delete("/:plantId", plantCtrl.delete);

module.exports = router;
