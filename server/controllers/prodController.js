const Product = require("../model/Product");

//get all products
const getAllProds = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
  }
};

// get single product
const getProdById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    // params.id === /:id
    if (!product) return res.status(404).send("No such product");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// add product
const addProd = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllProds, addProd , getProdById };
