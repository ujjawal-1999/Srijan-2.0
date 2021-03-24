const express = require("express");
const router = express.Router();
const NotifyEmailSchema = require("../models/notify");

router.post("/", async (req, res) => {
  try {
    let email = req.body.email;
    let alreadyExistingEmail = await NotifyEmailSchema.findOne({
      email,
    });
    if (alreadyExistingEmail) {
      res.redirect("/");
      return;
    }
    let user = new NotifyEmailSchema({
      email: email.toLowerCase(),
    });

    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
