const OrderModel = require("../Models/orderModel");

exports.createOrder = async (req, res) => {
  const newOrder = await OrderModel.create(req.body);

  if (!newOrder) {
    return res.status(401).json({ error: "Unable to process your order" });
  }

  return res.status(200).json(newOrder);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;

  const updatedOrder = await OrderModel.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );

  if (!updatedOrder) {
    return res.status(401).json({ error: "Unable to update the status" });
  }

  return res.status(200).json(updatedOrder);
};
