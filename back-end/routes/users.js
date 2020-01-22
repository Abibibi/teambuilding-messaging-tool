// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();

// Controller
const {
    signUp,
    signIn
} = require('../controllers/userController');

// to sign up
router.post('/add', signUp);

// to sign in
router.post('/login', signIn);

// router exported to create related API in app.js which will be made available to the client 
module.exports = router;