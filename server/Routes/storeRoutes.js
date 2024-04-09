const express = require("express");
const router = express.Router();

const storeController = require("../Controller/storeController");
const { protect } = require("../Controller/authController");
const { restrictTo } = require("../Controller/authController");


router.post("/createStore", protect, restrictTo("CEO", "Store Manager"), storeController.addStore);
router.get("/getStores", protect, restrictTo("CEO", "Store Manager"), storeController.getAllStores);
router.post("/updateStore/:id", protect, restrictTo("CEO", "Store Manager"), storeController.updateStore);

module.exports = router;