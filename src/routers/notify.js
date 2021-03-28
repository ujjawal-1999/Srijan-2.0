const express = require("express");
const router = express.Router();
const NotifyEmailSchema = require("../models/notify");
const {contact} = require('../nodemailer/mail');

router.post("/", async (req, res) => {
  try {
    let email = req.body.email;
    email = email.toLowerCase();
    let alreadyExistingEmail = await NotifyEmailSchema.findOne({
      email,
    });
    if (alreadyExistingEmail) {
      contact(email);
      res.redirect("/");
      return;
    }
    let user = new NotifyEmailSchema({
      email
    });
    contact(email);
    await user.save();

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

module.exports = router;
