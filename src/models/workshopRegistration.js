//Model for workshop registration
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workshopRegistrationSchema = new Schema(
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
    amount: {
      type: Number,
      default : 0
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

module.exports = WorkshopRegistration = mongoose.model(
  "WorkshopRegistration",
  workshopRegistrationSchema
);
