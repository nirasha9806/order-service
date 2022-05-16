const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');

router.post('/add-order', orderController.addOrder);

router.get(
  '/get-orders-by-customerId/:customerId',
  orderController.getOrdersByCustomerId
);

router.delete('/delete-order-by-id/:orderId', orderController.deleteOrderById);

router.put('/edit-quantity/:orderId', orderController.editQuantity);

router.get('/get-all-orders', orderController.getAllOrders);

module.exports = router;
