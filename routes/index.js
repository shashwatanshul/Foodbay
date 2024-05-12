var express = require("express");
var router = express.Router();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
var store = require("store");
var axios = require("axios");
var sha256 = require("sha256");
var uniqid = require("uniqid");
const Order = require("../models/orderModel");

router.get("/renderView", async function (req, res) {
  try {
    // Extract the data from the query parameters
    const { subtotal, cartItems, currentUser } = req.query;

    // Render the EJS file with the data
    console.log("home subtotal : ", subtotal);
    console.log("home cartItems : ", cartItems);
    console.log("home currentUser : ", currentUser);
    res.render("index", {
      page_respond_data:
        "Please Pay & Repond From The Payment Gateway Will Come In This Section",
      subtotal,
      cartItems,
      currentUser,
    });
  } catch (error) {
    console.error("Error rendering EJS file:", error);
    res.status(500).send("Internal Server Error");
  }
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
//PAY
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get("/pay", async function (req, res, next) {
  const { subtotal, cartItems, currentUser, tableNumber, mobileNumber } =
    req.query;

  // Decode the encoded parameters
  const decodeMobileNumber = parseFloat(mobileNumber);
  const decodeTableNumber = parseFloat(tableNumber);
  const decodedSubtotal = parseFloat(subtotal);
  const decodedCartItems = JSON.parse(cartItems);
  const decodedCurrentUser = JSON.parse(currentUser);
  console.log("mobileNumber pay : ", decodeMobileNumber);
  console.log("tableNumber pay : ", decodeTableNumber);
  console.log("subtotal pay : ", decodedSubtotal);
  console.log("cartItems pay : ", decodedCartItems);
  console.log("currentUser pay : ", decodedCurrentUser);

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Store it in DB also
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  let tx_uuid = uniqid();
  store.set("mobileNumber", JSON.stringify(decodeMobileNumber));
  store.set("uuid", { tx: tx_uuid });
  store.set("tableNumber", JSON.stringify(decodeTableNumber));
  store.set("subtotal", JSON.stringify(decodedSubtotal));
  store.set("cartItems", JSON.stringify(decodedCartItems));
  store.set("currentUser", JSON.stringify(decodedCurrentUser));
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  let normalPayLoad = {
    merchantId: "PGTESTPAYUAT",
    merchantTransactionId: tx_uuid,
    merchantUserId: "MUID123",
    amount: subtotal * 100,
    redirectUrl: "http://localhost:5000/paybutton/pay-return-url",
    redirectMode: "POST",
    callbackUrl: "http://localhost:5000/paybutton/pay-return-url",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
  let saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  let saltIndex = 1;
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
  let base64String = bufferObj.toString("base64");
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
  let string = base64String + "/pg/v1/pay" + saltKey;
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
  let sha256_val = sha256(string);
  let checksum = sha256_val + "###" + saltIndex;
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++
  axios
    .post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      {
        request: base64String,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          accept: "application/json",
        },
      }
    )
    .then(function (response) {
      res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
    })
    .catch(function (error) {
      res.render("index", { page_respond_data: JSON.stringify(error) });
    });
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
//PAY RETURN
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.all("/pay-return-url", async function (req, res) {
  console.log(
    "mobileNumber pay-return-url : ",
    parseFloat(store.get("mobileNumber"))
  );
  console.log(
    "tableNumber pay-return-url : ",
    parseFloat(store.get("tableNumber"))
  );
  console.log("subtotal pay-return-url : ", parseFloat(store.get("subtotal")));
  console.log(
    "cartItems pay-return-url : ",
    JSON.parse(store.get("cartItems"))
  );
  console.log(
    "currentUser pay-return-url : ",
    JSON.parse(store.get("currentUser"))
  );
  if (
    req.body.code == "PAYMENT_SUCCESS" &&
    req.body.merchantId &&
    req.body.transactionId &&
    req.body.providerReferenceId
  ) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 1.In the live please match the amount you get byamount you send also so that hacker can't pass static value.
    // 2.Don't take Marchent ID directly validate it with yoir Marchent ID
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //if (req.body.transactionId == store.get('uuid').tx && req.body.merchantId == 'PGTESTPAYUAT' && req.body.amount == 1000) {
    if (req.body.transactionId) {
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      let saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
      let saltIndex = 1;
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++
      let surl =
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/PGTESTPAYUAT/" +
        req.body.transactionId;
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      let string =
        "/pg/v1/status/PGTESTPAYUAT/" + req.body.transactionId + saltKey;
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      let sha256_val = sha256(string);
      let checksum = sha256_val + "###" + saltIndex;
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      //console.log(checksum);
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      axios
        .get(surl, {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": req.body.transactionId,
            accept: "application/json",
          },
        })
        .then(function (response) {
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          //DB OPERATION
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          //{PLease add your code.}
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          //RETURN TO VIEW
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          //console.log(response);

          const neworder = new Order({
            name: JSON.parse(store.get("currentUser")).name,
            email: JSON.parse(store.get("currentUser")).email,
            userid: JSON.parse(store.get("currentUser"))._id,
            orderItems: JSON.parse(store.get("cartItems")),
            orderAmount: parseFloat(store.get("subtotal")),
            transactionId: req.body.transactionId,
            tableNumber: parseFloat(store.get("tableNumber")),
            mobileNumber: parseFloat(store.get("mobileNumber")),
          });
          neworder.save();
          res.render("ordersuccess");
        })
        .catch(function (error) {
          res.render("index", { page_respond_data: JSON.stringify(error) });
        });
    } else {
      res.render("index", { page_respond_data: "Sorry!! Error1" });
    }
  } else {
    res.render("index", { page_respond_data: "Sorry!! Error2" });
  }
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get("/getuserorders/:userid", async (req, res) => {
  console.log(req.params.userid);
  const userid = req.params.userid;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.post("/toggle-delivered/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Toggle the value of isDelivered
    order.isDelivered = !order.isDelivered;

    // Save the updated order
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error toggling isDelivered:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
