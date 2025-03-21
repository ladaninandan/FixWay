const express = require("express");
const { Login } = require("../controllers/UserLoginController");
const router = express.Router();


router.post("/Login", Login);


module.exports = router
