const express = require('express');
const chatbotController = require('../controllers/chatbot');

const router = express.Router();

router.post('/anything', chatbotController.anything);

module.exports = router;