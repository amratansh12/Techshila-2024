const express = require("express");
const router = express.Router();

const authController = require("../Controller/authController");
const {protect} = require("../Controller/authController");
const {restrictTo} = require("../Controller/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/getUsers", protect, restrictTo('ceo'), authController.getAllUsers);

module.exports = router;
