const mongoose = require("mongoose");

const favSchema = new mongoose.Schema(
  {
    prodId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      minlength: 2,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fav = mongoose.model("favorites", favSchema);
module.exports = Fav;
