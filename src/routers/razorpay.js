const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment");
const express = require("express");
const router = express.Router();

var instance = new Razorpay({
  key_id: "rzp_test_FBhzettF0b2FZU",
  key_secret: "eJA2LybH9bZ7GgKkvM1kXgsL",
});

//Route to create order id
router.post("/orders", async (req, res) => {
  try {
    let receiptNo = `${req.body.name}_${Date.now()}`;
    receiptNo = receiptNo.length > 40 ? receiptNo.slice(0, 39) : receiptNo;
    let orderParams = new Object({
      amount: req.body.amount * 100,
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
    console.log({ data });
    const newPayment = await new Payment({
      data: data,
    }).save();
    console.log({ newPayment });
    //Create an object here to genereate popup params
    res.render("checkout", {
      order,
      key_id: "rzp_test_FBhzettF0b2FZU",
      key_secret: "eJA2LybH9bZ7GgKkvM1kXgsL",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
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
    await Payment.findOneAndUpdate({"data.orderId": orderId},{
        "data.signature" : signature,
        "data.paymentId" : paymentId,
        "data.status" : newStatus
    })
    res.send("Payment Completed");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
