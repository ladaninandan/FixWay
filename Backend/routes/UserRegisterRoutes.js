const express = require("express");
const { registerUser, getregisteruser, deleteUser } = require("../controllers/UserRegisterController");

const router = express.Router();

// POST /register - Register a new user
router.post("/UserRegister", registerUser);

// admin page show all user 
router.get("/GetAllRegisterUser", getregisteruser);

// delete user
router.delete("/DeleteRegisterUser/:id", deleteUser);


module.exports = router;