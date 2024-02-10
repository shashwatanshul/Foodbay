const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const Pizza = require("./models/pizzaModel");
const db = require("./db");
const cors = require("cors");

const pizzasRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");

//--------------------------------------------------------------------
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
//++++++++++++++++++++++++++++++++++++++++++
var indexRouter = require("./routes/index");
//------------------------------------------------------------

const app = express();
app.use(cors());

//------------------------------------------------------------------------------

//++++++++++++++++++++++++++++++++++++++++++
// view engine setup
//++++++++++++++++++++++++++++++++++++++++++
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//++++++++++++++++++++++++++++++++++++++++++
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//++++++++++++++++++++++++++++++++++++++++++

//--------------------------------------------------------------------------------

app.use(express.json());

// Routes
app.use("/api/pizzas/", pizzasRoute);

app.use("/api/users/", userRoute);
//----------------------------------------------------------------
app.use("/paybutton", indexRouter);
//++++++++++++++++++++++++++++++++++++++++++
// catch 404 and forward to error handler
//++++++++++++++++++++++++++++++++++++++++++
app.use(function (req, res, next) {
  next(createError(404));
});
//++++++++++++++++++++++++++++++++++++++++++
// error handler
//++++++++++++++++++++++++++++++++++++++++++
app.use(function (err, req, res, next) {
  //++++++++++++++++++++++++++++++++++++++++++
  // set locals, only providing error in development
  //++++++++++++++++++++++++++++++++++++++++++
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  //++++++++++++++++++++++++++++++++++++++++++
  // render the error page
  //++++++++++++++++++++++++++++++++++++++++++
  res.status(err.status || 500);
  res.render("error");
});
//-----------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Server Working " + PORT);
});

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running in port: " + PORT);
});
