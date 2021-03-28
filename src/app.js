const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const notifyRouter = require("./routers/notify");
const registerRouter = require("./routers/register");

const app = express();
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../template/views"));

app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;

app.use("/notify", notifyRouter);
app.use("/", registerRouter);

app.get("*", (req, res) => {
  res.render("error");
});

app.listen(port, () => {
  console.log("Server is up on port : " + port);
});
