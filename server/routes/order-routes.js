const express = require("express");
const router = express.Router() ;
const auth = require("../middlewares/auth");
const orderController = require("../controllers/orderController");


//router.get("/" , orderController.getAllorders) ;
router.get("/my-orders" ,auth , orderController.getMyOrders) ;
router.get("/:id" ,auth , orderController.getOrderById) ;
router.post("/" ,auth , orderController.addOrder) ;

module.exports = router ;