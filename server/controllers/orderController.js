const Order = require("../model/Order");

// get all orders of specific user
const getMyOrders = async (req, res) => {
  try{
    const myOrders = await Order.find({ userId:req.payload._id});
    // if(myCards.length == 0) return res.status(404).send("there are no cards");
    res.status(200).send(myOrders) ;
    }
    catch(err){
        res.status(400).send("Error in GET  user cards") ;
    }
    
    };


// get single order
const getOrderById = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    // params.id === /:id
    if (!order) return res.status(404).send("No such order");
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

// add order
const addOrder = async (req, res) => {
  try {
    let newOrder = new Order({
      orderItems: req.body.orderItems.map((x)=>({...x, productId: x._id})),
      shippingAddress : req.body.shippingAddress,
      itemsPrice : req.body.itemsPrice,
      shippingPrice : req.body.shippingPrice,
      taxPrice : req.body.taxPrice,
      totalPrice : req.body.totalPrice,
      userId : req.payload._id,
    });
    const order = await newOrder.save();
    res.status(201).send({message:"New order created" , order});
  } catch (err) {
    console.log(err);
  }
};

module.exports = {  addOrder , getOrderById , getMyOrders };