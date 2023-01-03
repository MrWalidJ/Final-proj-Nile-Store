const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    minlength: 4,
  },
  image: {
    type: String,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    required: false,
  },
  userId: {   
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User",   
    required: true
  }
},{
  timestamps: true,
}
);

const Product = mongoose.model("products", productsSchema); // if we put "user" it will add a collection with name "users"
module.exports = Product;
