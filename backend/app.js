const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post.routes");
const path = require("path");

const connectString =
  "mongodb+srv://" +
  process.env.MONGO_USERNAME +
  ":" +
  process.env.MONGO_PASSWORD +
  "@grade-trade.b0zcd.mongodb.net/" +
  process.env.DATABASE_NAME +
  "?retryWrites=true&w=majority";
const options = { useUnifiedTopology: true, useNewUrlParser: true };

const connectMongoose = async () => {
  try {
    const connection = await mongoose.connect(connectString, options);
    console.log("connected");
  } catch (error) {
    console.log(error, "not connected");
  }
};

connectMongoose();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE",
    "OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/api", postRoutes);

module.exports = app;
