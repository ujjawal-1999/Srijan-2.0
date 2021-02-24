const mongoose = require("mongoose");

const NotifyEmailSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

module.exports = NotifyEmail = mongoose.model(
  "NotifyEmailSchema",
  NotifyEmailSchema
);
