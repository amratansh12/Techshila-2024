const express = require("express");
const { protect, restrictTo } = require("../Controller/authController");

const orderController = require("../Controller/orderController");

const router = express.Router();

router.post("/createOrder", protect, orderController.createOrder);
router.post("/updateStatus/:id", protect, orderController.updateStatus);

module.exports = router;
