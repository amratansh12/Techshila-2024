const store = require("../Models/storesModel");

exports.getAllStores = async (req, res) => {
  try {
    const stores = await store.find();
    res.status(200).json({
      status: "success",
      data: {
        stores,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addStore = async (req, res) => {
  try {
    const { name, address, location, contactNumber } = req.body;

    const newStore = await store.create({
      name,
      address,
      location,
      contactNumber,
    });

    if (!newStore) {
      return res.status(401).json({ error: "Internal Server erro" });
    }

    return res.status(201).json({
      status: "success",
      data: {
        store: newStore,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const updatedStore = await store.findByIdAndUpdate(storeId, {
      ...req.body,
    });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
