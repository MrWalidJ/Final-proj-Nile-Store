const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const register = require("./routes/register");
const resetPassword = require("./routes/resetPassword");
const forgotPassword = require("./routes/forgotPassword");
const signin = require("./routes/signin");
// const profile = require("./routes/profile");
const products = require("./routes/prod-routes");

const orders = require("./routes/order-routes");
const contacts = require("./routes/contact-us");
const profile = require("./routes/profile");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());
// connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB atlas..."))
  .catch((err) => console.log("Cannot connect to MongoDB..."));

app.use(express.urlencoded({ extended: true }));
app.use("/api/register", register);
app.use("/api/signin", signin);
app.use("/api/reset-password", resetPassword);
app.use("/api/forgot-password", forgotPassword);
app.use("/api/profile", profile);
app.use("/api/products", products);
app.use("/api/orders", orders);
app.use("/api/contacts", contacts);
app.listen(PORT, () => console.log("Server started on port " + PORT));
