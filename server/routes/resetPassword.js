const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

const passwordSchema = joi.object({
  password: joi.string().required().min(5),
});

// verify url
router.get("/:id/:token", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("invalid link !!");
    const payload = jwt.verify(
      req.params.token,
      process.env.JWT_RESET_PASSWORD_KEY
    );
    if (!payload) return res.status(400).send(" invalid link !!");
    res.status(200).send("Valid link");
  } catch (err) {
    res.status(500).send({ message: "Server error !!" });
  }
});

router.post("/:id/:token", async (req, res) => {
  try {
    // joi validation for body
    const { error } = passwordSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // get the token from params and get the payload from it
    const payload = jwt.verify(
      req.params.token,
      process.env.JWT_RESET_PASSWORD_KEY
    );
    //check if user exists
    let user = await User.findOne({ _id: payload.id });
    if (!user) return res.status(400).send("invalid link !!");

    // salt generation
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error !!" });
  }
});

module.exports = router;
