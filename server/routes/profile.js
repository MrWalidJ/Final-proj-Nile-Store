const express = require("express");
const _ = require("lodash");
const User = require("../model/User");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.payload._id);
    if (!user) return res.status(400).send("error in profile");
    res.status(200).send(_.pick(user, ["_id", "name", "email", "isAdmin"])); // pick fields to display
  } catch (err) {
    res.status(400).send("Something went wrong !!");
  }
});

module.exports = router;
