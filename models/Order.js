const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    items: [
      {
        itemName: { type: String, required: true },
        itemCode: { type: String, required: true },
        quantity: { type: Number, required: true },
        size: { type: Number, required: false },
      },
    ],
    totalAmount: { type: String, required: true },
    date: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
  },
  { timesamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
