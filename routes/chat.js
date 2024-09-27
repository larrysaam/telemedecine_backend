const express = require('express')
const router = express.Router()
const ChatController = require('../controllers/chat')


// create a chat
router.post('/', ChatController.createChat)

//get messages between 2 users
router.get('/:id', ChatController.getMessage)

// send message
router.patch('/:id', ChatController.SendMessage)


module.exports = router