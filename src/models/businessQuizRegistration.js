//Model for workshop registration
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BusinessQuizRegistrationSchema = new Schema(
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
    event: {
      type: String,
    },
    address:{
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = BusinessQuizRegistration = mongoose.model(
  "BusinessQuizRegistration",
  BusinessQuizRegistrationSchema
);
