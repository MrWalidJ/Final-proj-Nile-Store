const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const register = require("./routes/register");
// const login = require("./routes/login");
// const profile = require("./routes/profile");
 const products = require("./routes/prod-routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());
// connect to mongodb
mongoose
  .connect(process.env.db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Cannot connect to MongoDB..."));
  

app.use(express.urlencoded({ extended: true }));
// app.use("/api/register", register);
// app.use("/api/login", login);
// app.use("/api/profile", profile);
app.use("/api/products", products);



app.listen(PORT, () => console.log("Server started on port " + PORT));
