const express = require("express");
const router = express.Router();

const inventoryController = require("../Controller/inventoryController");
const { protect } = require("../Controller/authController");
const { restrictTo } = require("../Controller/authController");

router.post(
  "/createInventory",
  protect,
  restrictTo("Store Manager"),
  inventoryController.addInventory
);
router.get(
  "/getInventories",
  protect,
  restrictTo("User"),
  inventoryController.getAllInventories
);
router.post(
  "/updateInventory/:id",
  protect,
  restrictTo("Store Manager"),
  inventoryController.updateInventory
);

module.exports = router;
