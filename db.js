const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var db = mongoose.connection;

db.on("connected", () => {
  
});

db.on("error", () => {
  
});

module.exports = mongoose;
