const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  data: {
    type: Object,
  }
},{
  timestamps: true,
});

module.exports = Payment = mongoose.model("PaymentSchema", PaymentSchema);
