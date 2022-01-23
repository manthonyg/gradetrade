const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const postRoutes = require("./routes/posts");
// const userRoutes = require("./routes/user");
const path = require("path");

console.log(process.env);
// Connection URL
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
  // set header takes the key (header) and value (value for that header)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE",
    "OPTIONS"
  );
  next();
});
app.use(express.static(path.join(__dirname, "..", "dist", "grade-trade")));

// app.use(bodyParser.json()); // will return valid express middleware to parse json data
// app.use(bodyParse.urlencoded({extended: true})) // would be for xml encoded stuff
// app.use("/images", express.static(path.join("images")));

// app.use("/api", postRoutes);
// app.use("/api", userRoutes);

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "dist", "grade-trade", "index.html"))
);

module.exports = app;
