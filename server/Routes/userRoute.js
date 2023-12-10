const express = require('express')
const router = express.Router()
const { registerUser, authUser, allUsers } = require("../controller/userController");
const protect = require('../middleware/Auth');
router.route("/register").post(registerUser);
router.route("/login").post(authUser)
router.route("/all-users").get(protect,allUsers)
module.exports = router