const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const favController = require("../controllers/favController");

router.get("/my-favs", auth, favController.getMyFavs);
router.post("/", auth, favController.addFavItem);
router.delete("/:id" ,auth , favController.deleteFavItem) ;
module.exports = router;
