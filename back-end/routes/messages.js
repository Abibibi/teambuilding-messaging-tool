// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();
const authMiddleware = require('../utils/authMiddleware');


// Controller
const {
    addMessage,
    receivedMessages
} = require('../controllers/messageController');

router.post('/addMessage', authMiddleware, addMessage);

router.get('/receivedMessages', authMiddleware, receivedMessages);

module.exports = router;