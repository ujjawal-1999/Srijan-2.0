const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  data: {
    type: Object,
  },
});

module.exports = Payment = mongoose.model("PaymentSchema", PaymentSchema);
