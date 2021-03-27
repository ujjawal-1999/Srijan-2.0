//Model for workshop registration
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registrationSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    college: {
      type: String,
    },
    workshops: {
      type: Array,
    },
    graduationYear: {
      type: String,
    },
    tshirt: {
      type: Boolean,
    },
    tshirtSize: {
      type: String,
    },
    amount: {
      type: Number,
    },
    paymentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PaymentSchema",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Registration = mongoose.model(
  "Registration",
  registrationSchema
);
