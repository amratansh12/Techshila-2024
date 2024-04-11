const express = require("express");
const router = express.Router();

const inventoryController = require("../Controller/inventoryController");
const { protect } = require("../Controller/authController");
const { restrictTo } = require("../Controller/authController");

router.post(
  "/createInventory",
  protect,
  restrictTo("CEO", "Store Manager"),
  inventoryController.addInventory
);
//integrated to the frontend
router.get(
  "/getInventories",
  protect,
  restrictTo("CEO", "Store Manager"),
  inventoryController.getAllInventories
);
router.post(
  "/updateInventory/:id",
  protect,
  restrictTo("CEO", "Store Manager"),
  inventoryController.updateInventory
);

module.exports = router;
