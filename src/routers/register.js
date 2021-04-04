const router = require("express").Router();
const WorkshopRegistration = require("../models/workshopRegistration");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment");
const path = require("path");
const EventRegistration = require("../models/eventRegistration");
const SpeakerRegistration = require("../models/speakerRegistration");
require("dotenv").config();

const { speakers } = require('../utils/speakers');

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const defaultWorkshops = {
  "Stock Market": 100,
};

router.post("/orders", async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      college,
      graduationYear,
      workshops,
      amount,
    } = req.body;

    if (typeof workshops === "string") workshops = [workshops];
    workshops = workshops.filter((workshop) => {
      return workshop !== "";
    });

    if (workshops.length > 2) return res.redirect("/workshop-register");
    let finalAmount = 0;
    if (workshops && workshops.includes("Stock Market")) {
      finalAmount = 100;
    }

    if (parseInt(amount) != finalAmount) amount = finalAmount;
    let applicantData = {
      name,
      email,
      phone,
      college,
      graduationYear,
      workshops,
      amount,
    };
    if (amount == 0) {
      let registration = await new WorkshopRegistration(applicantData).save();
      // return res.render('success');
      // return res.send("Success");
      return res.render("workshopRegistrationSuccessful", {
        data: registration,
      });
    }
    // let registration = await new Registration(applicantData).save();
    // console.log(registration);

    // Payment Code
    let receiptNo = `${req.body.name}_${Date.now()}`;
    receiptNo = receiptNo.length > 40 ? receiptNo.slice(0, 39) : receiptNo;
    let orderParams = new Object({
      amount: parseInt(amount) * 100,
      currency: "INR",
      payment_capture: true,
      receipt: receiptNo,
    });

    const order = await instance.orders.create(orderParams);
    const data = {
      name: req.body.name,
      email: req.body.email,
      amount: parseInt(req.body.amount),
      receipt: order.receipt,
      orderId: order.id,
      status: order.status,
    };

    const newPayment = await new Payment({
      data: data,
    }).save();
    // console.log({ newPayment });

    applicantData.paymentId = newPayment._id;

    let registration = await new WorkshopRegistration(applicantData).save();
    // console.log(registration);

    //Create an object here to genereate popup params
    res.render("verifyDetails", {
      order,
      newPayment: registration,
      key_id: instance.key_id,
      key_secret: instance.key_secret,
    });
  } catch (error) {
    console.log(error);
    res.render("registrationFailed");
  }
});

router.post("/verify", async (req, res) => {
  try {
    let orderId = req.body.razorpay_order_id;
    let paymentId = req.body.razorpay_payment_id;
    let signature = req.body.razorpay_signature;
    let body = `${orderId}|${paymentId}`;

    var expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    let newStatus = "created";
    if (expectedSignature === signature) {
      newStatus = "success";
    } else {
      newStatus = "Unauthenticated";
    }
    // console.log({ newStatus });
    const newPay = await Payment.findOneAndUpdate(
      { "data.orderId": orderId },
      {
        "data.signature": signature,
        "data.paymentId": paymentId,
        "data.status": newStatus,
      },
      { new: true }
    );
    // console.log({ newPay });
    res.end();
  } catch (error) {
    console.log(error);
    res.redirect("/failure");
  }
});

router.get("/success", async (req, res) => {
  try {
    let registrationId = req.query.registrationId;
    // console.log("Starting Success route");
    // console.log("Registration id: ", registrationId);
    // console.log("Registration id: ", typeof registrationId);

    if (!registrationId) {
      console.log("No registration id");
      return res.redirect("/failure");
    }

    let registration = await WorkshopRegistration.findById(registrationId);
    if (!registration) {
      // console.log("No registration with given id");
      return res.redirect("/failure");
    }

    let paymentData = await Payment.findById(registration.paymentId);

    if (!paymentData) {
      console.log("No Payment data");
      return res.redirect("/failure");
    }
    // console.log("Final Data Reg: ", registration);
    // console.log("Final Data Pay: ", paymentData);

    res.render("paymentSuccess", {
      registration,
      paymentData: paymentData.data,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/failure");
  }
});

router.get("/failure", (req, res) => {
  res.render("paymentFailure");
});

// Get routes for regstration pages

router.get("/event-register", (req, res) => {
  let eventRegistrationForm = path.join(
    __dirname,
    "../../public/event-registration-form.html"
  );
  res.sendFile(eventRegistrationForm);
});

router.get("/workshop-register", (req, res) => {
  let workshopRegistrationForm = path.join(
    __dirname,
    "../../public/registration-form.html"
  );
  res.sendFile(workshopRegistrationForm);
});

// Post route for event registration
router.post("/event-register", async (req, res) => {
  try {
    let {
      teamName,
      leaderName,
      leaderEmail,
      teamMembers,
      leaderPhone,
      leaderAddress,
      events,
    } = req.body;
    if (typeof teamMembers === "string") {
      teamMembers = [teamMembers];
    }
    if (typeof events == "string") {
      events = [events];
    }
    teamMembers = teamMembers.filter((teamMember) => {
      return teamMember !== "";
    });
    events = events.filter((event) => {
      return event !== "";
    });
    const newEvent = await new EventRegistration({
      teamName,
      leaderName,
      leaderEmail,
      teamMembers,
      leaderPhone,
      leaderAddress,
      events,
    }).save();
    if (!newEvent) return res.render("eventRegistrationFailed");
    // console.log(newEvent);
    res.render("registrationSuccessful", { data: newEvent });
  } catch (err) {
    console.log(err);
    return res.render("eventRegistrationFailed");
  }
});

//Routes to register for speaker's session
router.get("/speaker-register", async (req, res) => {
  try {
    let speaker = req.query.speaker;
    res.render("speaker-registration-form", {
      speaker: speakers[speaker],
    });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

router.post("/speaker-register", async (req, res) => {
  try {
    let { name, email, phone, speaker } = req.body;
    let applicantData = new Object({
      name,
      email,
      phone,
      speaker,
    });
    let applicant = await new SpeakerRegistration(applicantData).save();

    if (!applicant) {
      return res.render("speakerRegistrationFailed");
    }
    res.render("speakerRegistrationSuccessful", { data: applicant });
  } catch (error) {
    console.log(error);
    return res.render("speakerRegistrationFailed");
  }
});

module.exports = router;
