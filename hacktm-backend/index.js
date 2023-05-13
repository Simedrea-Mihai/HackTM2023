const express = require("express");
const app = express();
const config = require("config");
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("tiny"));
const mongoose = require("mongoose");
mongoose.connect(config.get("connkey")).then(async () => {
  const { evrouter } = require("./controller/eventscontroller");
  app.use("", evrouter);
  app.listen(5000, () => {
    console.log("Server started");
  });

  module.exports = mongoose;
});
