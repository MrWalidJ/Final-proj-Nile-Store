const express = require("express");
const router = express.Router() ;
const auth = require("../middlewares/auth");
const prodController = require("../controllers/prodController");


router.get("/" , prodController.getAllProds) ;
router.get("/my-products" ,auth, prodController.getMyProds) ;
router.get("/:id" , prodController.getProdById) ;
router.put("/:id" ,auth , prodController.updateProd) ;
router.post("/" ,auth , prodController.addProd) ;
router.delete("/:id" ,auth , prodController.deleteProd) ;

module.exports = router ;