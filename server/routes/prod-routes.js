const express = require("express");
const router = express.Router() ;
const prodController = require("../controllers/prodController");


router.get("/" , prodController.getAllProds) ;
router.get("/:id" , prodController.getProdById) ;
router.post("/" , prodController.addProd) ;

module.exports = router ;