const Fav = require("../model/Fav");
const joi = require("joi");
const favsSchema = joi.object({
  prodId: joi.string().required().min(2),
  name: joi.string().required().min(2),
  price: joi.number().required().min(0),
  category: joi.string().required().min(2),
  image: joi.string().required().min(2),
});

const getMyFavs = async (req, res) => {
  try {
    const myFavs = await Fav.find({ userId: req.payload._id });
    // if(myFavs.length == 0) return res.status(404).send("there are no Products");
    res.status(200).send(myFavs);
  } catch (err) {
    res.status(400).send(err);
  }
};

// add product
const addFavItem = async (req, res) => {
  try {
    //1. joi validation for body
    const { error } = favsSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Check for existing item
    let favItem = await Fav.findOne({ prodId: req.body.prodId });
    if (favItem) return res.status(400).send("Item already added");

    //2. Add user_id field to fav object
    let fav = new Fav(req.body);
    fav.userId = req.payload._id;
    await fav.save();
    //console.log(fav);
    res.status(201).send(fav); // send response to client
  } catch (error) {
    res.status(400).send(" There is an error");
  }
};

const deleteFavItem = async (req, res) => {
  try {
    let fav = await Fav.deleteOne({prodId:req.params.id});
    if (!fav) return res.status(404).send("fav not found");
    res.status(200).send("fav was deleted");
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = { getMyFavs, addFavItem, deleteFavItem };
