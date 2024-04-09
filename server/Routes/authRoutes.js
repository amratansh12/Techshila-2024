const express = require("express");
const router = express.Router();

const authController = require("../Controller/authController");
const { protect } = require("../Controller/authController");
const { restrictTo } = require("../Controller/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get(
  "/getUsers",
  protect,
  restrictTo("CEO", "Store Manager"),
  authController.getAllUsers
);
router.post(
  "/updateUser/:id",
  protect,
  restrictTo("CEO"),
  authController.updateUser
);
router.delete(
  "/deleteUser/:id",
  protect,
  restrictTo("CEO"),
  authController.deleteUser
);

module.exports = router;
