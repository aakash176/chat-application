const express = require('express')
const router = express.Router()
const protect = require('../middleware/Auth')
const {sendMessage, allMessages} = require('../controller/messageController')


router.route("/").post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)

module.exports = router
