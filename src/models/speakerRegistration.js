//Model for workshop registration
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SpeakerRegistrationSchema = new Schema(
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
    speaker: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = WorkshopRegistration = mongoose.model(
  "SpeakerRegistration",
  SpeakerRegistrationSchema
);
