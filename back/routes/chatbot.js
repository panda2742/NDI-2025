const express = require('express');
const chatbotController = require('../controllers/chatbot');

const router = express.Router();

router.post('/message', chatbotController.message);

module.exports = router;