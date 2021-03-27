//Model for event registration
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventRegistrationSchema = new Schema(
  {
    teamName :{
        type: String
    },
    leaderName:{
        type: String
    },
    leaderEmail:{
        type: String
    },
    leaderPhone:{
        type: String
    },
    teamMembers:{
        type: Array
    },
    leaderAddress:{
        type:String
    },
    events:{
        type:Array
    },
  },
  {
    timestamps: true,
  }
);

module.exports = EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);
