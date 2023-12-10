const express = require('express')
const router = express.Router()
const protect = require('../middleware/Auth')
const { accessChat, fetchChat } = require("../controller/chatController");

router.route("/").post(protect, accessChat)
router.route('/').get(protect,fetchChat)
// router.route('/group').post(protect,createGroupChat)
// router.route('/rename').put(protect,renameGroupChat)
// router.route('/remove-from-group').put(protect,removeFromGroup)
// router.route('/add-to-group').put(protect,addToGroup)

module.exports = router