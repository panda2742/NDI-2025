const express = require('express');
const chatbotController = require('../controllers/chatbot');

const router = express.Router();

router.post('/message', chatbotController.message);

router.post('/notification', chatbotController.notification);

module.exports = router;