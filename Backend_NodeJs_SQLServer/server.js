/*!
 * @PutthamawadeeS@gsb.or.th
 */
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const path = require('path');

var app = express();

var useragent = require("express-useragent");

const dotenv = require("dotenv");
dotenv.config();

var port = process.env.PORT || 80;

app.use(cors());
app.use(useragent.express());

//set port
app.listen(port, () => {
  console.log("MASP-CASH-API port is running " + port);
});

// set urlencoded
// Set the limit to 50 MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//set base routes
var router = require("./routes")();
app.use("/cash-api", router);

//set images & fonts path static
app.use('/cash-api/img', express.static(path.join(__dirname, '/img')))
app.use('/cash-api/fonts', express.static(path.join(__dirname, '/fonts')))

//try to call base routes
app.get("/cash-api", function (req, res) {
  res.send("<h1>Welcome To MASP-CASH-API Server!</h1>");
});

// catch error
process.on("uncaughtException", function (err) {
  console.error("uncaughtException: " + err);

  console.log("Node NOT Exiting...");
});

// catch warning
process.on("warning", (warning) => {
  if (!warning.message.includes("Buffer() is deprecated")) {
    console.error(warning);
  }
});
