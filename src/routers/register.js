const router = require("express").Router();
const Registration = require("../models/registration");

const defaultWorkshops = {
  a: 300,
  b: 300,
  c: 300,
  d: 300,
};

router.post("/register", async (req, res) => {
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
    if (typeof workshops === "string") {
      console.log("Type of workshops is string");
      workshops = [workshops];
    }
    if (tshirt === "Yes") {
      tshirt = true;
    } else {
      tshirt = false;
    }

    let finalAmount = 0;
    workshops.forEach((workshop) => {
      finalAmount += defaultWorkshops[workshop];
    });
    if (amount !== finalAmount) {
      amount = finalAmount;
    }

    let data = {
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
    console.log("Final data: ", data)
    let registration = await new Registration(data).save();
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.send("Fail");
  }
});

module.exports = router;
