const express = require("express");
const router = express.Router();
const { addfuledata, getFuleData } = require("../controllers/AdminAddFuleData");

// add data
router.post("/addFuleData", addfuledata);

// show data
router.get("/getFuleData", getFuleData)

module.exports = router;