const Contact = require("../model/Contact");
const express = require("express");
const router = express.Router();
const joi = require("joi");
const contactSchema = joi.object({
  Fname: joi.string().required().min(2),
  Lname: joi.string().required().min(2),
  email: joi.string().required().min(6).email(),
  message: joi.string().required().min(2),
});

router.post("/", async (req, res) => {
  try {
    // joi validation
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    let contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send(" There is an error");
  }
});

module.exports = router;
