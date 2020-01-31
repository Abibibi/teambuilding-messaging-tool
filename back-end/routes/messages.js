// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();
const authMiddleware = require('../utils/authMiddleware');


// Controller
const {
    addMessage
} = require('../controllers/messageController');

router.post('/addMessage', authMiddleware, addMessage);

module.exports = router;