const express = require("express");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const User = require("../model/User");
const router = express.Router();
const sendEmail = require("../config/mailer");

const emailSchema = joi.object({
  email: joi.string().required().min(6).email(),
});

router.post("/", async (req, res) => {
  try {
    //1. joi validation for body
    const { error } = emailSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    //2.  check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User doesn't exist !!");
   // Generate token do user has only 15 min to change his password
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_RESET_PASSWORD_KEY,
      {
        expiresIn: "15m",
      }
    );

    const url = `${process.env.CLIENT_BASE_URL}resetPassword/${user._id}/${token}`;
    sendEmail(process.env.EMAIL_EMAIL, user.email, " Password reset", url);

    res
      .status(200)
      .send({ message: "Password reset link was sent to your email" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error !!" });
  }
});

module.exports = router;
