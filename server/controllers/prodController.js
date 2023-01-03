const Product = require("../model/Product");
const joi = require("joi");
const prodSchema = joi.object({
  name: joi.string().required().min(2),
  price: joi.number().required(),
  category: joi.string().required().min(2),
  description: joi.string().required().min(2),
  image: joi.string().required(),
  inStock: joi.number().required(),
  ratings: joi.number(),
});

//get all products
const getAllProds = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
};

//get all products of specific user
const getMyProds = async (req, res) => {
  try {
    const myProducts = await Product.find({ userId: req.payload._id });
    // if(myProducts.length == 0) return res.status(404).send("there are no Products");
    res.status(200).send(myProducts);
  } catch (err) {
    res.status(400).send(err);
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
    //1. joi validation for body
    const { error } = prodSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    //2. Add user_id field to product object
    let product = new Product(req.body);
    product.userId = req.payload._id;
    await product.save();
    //console.log(product);
    res.status(201).send(product); // send response to client
  } catch (error) {
    res.status(400).send("Aha there is error");
  }
};

// update product
const updateProd = async (req, res) => {
  try {
    const { error } = prodSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send("product not found");
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send("Error in PUT specific card");
  }
};

//delete product
const deleteProd = async (req, res) => {
  try {
    let product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send("Product was deleted");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getAllProds, addProd, getProdById, getMyProds,updateProd, deleteProd };
