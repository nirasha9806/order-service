const Order = require('../models/Order');

const addOrder = async (req, res, next) => {
  try {
    const order = await new Order(req.body);

    await order.save();
    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

const getOrdersByCustomerId = async (req, res, next) => {
  const cusId = req.params.customerId;
  try {
    const orders = await Order.find({ customerId: cusId });

    res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

const deleteOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByIdAndRemove(orderId);

    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

const editQuantity = async (req, res, next) => {
  const orderId = req.params.orderId;
  const { itemCode, newQuantity } = req.body;

  try {
    const order = await Order.findById(orderId);

    for (let item of order.items) {
      if (item.itemCode === itemCode) {
        item.quantity = newQuantity;
      }
    }

    await order.save();
    res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders: orders });
  } catch (err) {
    return res.status(400).json({ success: false, err });
  }
};

exports.addOrder = addOrder;
exports.getOrdersByCustomerId = getOrdersByCustomerId;
exports.deleteOrderById = deleteOrderById;
exports.editQuantity = editQuantity;
exports.getAllOrders = getAllOrders;
