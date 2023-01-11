const express = require("express");
const joi = require("joi");
const { generateToken } = require("../utils");
const bcrypt = require("bcrypt");
const User = require("../model/User");

const router = express.Router();
const jwt = require("jsonwebtoken");

const registerSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().min(6).max(1024).email(),
  password: joi.string().required().min(5),
  isAdmin: joi.boolean().required(),
});

router.post("/", async (req, res) => {
  try {
    // joi validation
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // check for existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    // create user
    user = new User(req.body);

    // encrypt password
    const salt = await bcrypt.genSalt(10); // salt generation
    user.password = await bcrypt.hash(user.password, salt); // encryption

    await user.save();
    res.status(201).send({
      token: generateToken(user),
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
