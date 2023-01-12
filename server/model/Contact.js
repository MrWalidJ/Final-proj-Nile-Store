const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    Fname: {
      type: String,
      required: true,
      minlength: 2,
    },
    Lname: {
        type: String,
        required: true,
        minlength: 2,
      },
    email: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    message: {
      type: String,
      minlength: 2,
      required: true,
    },
 
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("contacts", contactSchema); 
module.exports = Contact;
