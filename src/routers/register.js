const router = require("express").Router();
const Registration = require("../models/registration");

router.post("/register", async (req, res) => {
  console.log("Req.Body : ", req.body);
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
  console.log(typeof workshops);
  if (typeof workshops === 'string') {
      console.log("Type of workshops is string");
    workshops = [workshops];
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
  console.log({ data });
  res.send("sUCCESS");
  // let registration = await new Registration({
  //     name,
  //     email,
  //     phone,
  //     college,
  //     graduationYear,
  //     workshops,
  //     amount,
  //     tshirt,
  //     tshirtSize
  // }).save();
});

module.exports = router;
