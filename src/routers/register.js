const router = require("express").Router();
const Registration = require("../models/registration");

const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment");

var instance = new Razorpay({
  key_id: "rzp_test_FBhzettF0b2FZU",
  key_secret: "eJA2LybH9bZ7GgKkvM1kXgsL",
});

const defaultWorkshops = {
  a: 300,
  b: 300,
  c: 300,
  d: 300,
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
      tshirt,
      tshirtSize,
    } = req.body;

    if (typeof workshops === "string") workshops = [workshops];
    if (tshirt === "Yes") tshirt = true;
    else tshirt = false;

    let finalAmount = 0;
    if (workshops && workshops.length) {
      workshops.forEach((workshop) => {
        finalAmount += defaultWorkshops[workshop];
      });
    }
    if(tshirt)
      finalAmount += 350;
    if(parseInt(amount) != finalAmount)
      amount = finalAmount;
    let applicantData = {
      name,
      email,
      phone,
      college,
      graduationYear,
      workshops,
      amount,
      tshirt,
      tshirtSize,
    };
    let registration = await new Registration(applicantData).save();
    console.log(registration);

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
      amount: req.body.amount,
      receipt: order.receipt,
      orderId: order.id,
      status: order.status,
    };

    const newPayment = await new Payment({
      data: data,
    }).save();
    console.log({ newPayment });
    //Create an object here to genereate popup params
    res.render("verifyDetails", {
      order,
      newPayment : registration,
      key_id: instance.key_id,
      key_secret: instance.key_secret,
    });
  } catch (error) {
    console.log(error);
    res.send("Fail");
  }
});

router.post("/verify", async (req, res) => {
  try {
    let orderId = req.body.razorpay_order_id;
    let paymentId = req.body.razorpay_payment_id;
    let signature = req.body.razorpay_signature;
    let body = `${orderId}|${paymentId}`;

    var expectedSignature = crypto
      .createHmac("sha256", "eJA2LybH9bZ7GgKkvM1kXgsL")
      .update(body.toString())
      .digest("hex");
    let newStatus = "created";
    if (expectedSignature === signature) {
        newStatus = "success";
    } else {
        newStatus = "Unauthenticated";
    }
    console.log({newStatus})
    const newPay = await Payment.findOneAndUpdate({"data.orderId": orderId},{
        "data.signature" : signature,
        "data.paymentId" : paymentId,
        "data.status" : newStatus
    }, {new : true})
    console.log({newPay});
    res.render('paymentStatus')
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
