const express = require("express");
const router = express.Router();
const NotifyEmailSchema = require("../models/notify");

router.post("/", async (req, res) => {
  try {
    let user = new NotifyEmailSchema(req.body);
    await user.save();
    res.send("Successful");
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = router