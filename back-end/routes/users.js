// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();
const authMiddleware = require('../utils/authMiddleware');

// Controller
const {
    isAuth,
    signUp,
    signIn,
    signOut
} = require('../controllers/userController');

// to check if user is already logged when arriving on page
router.get('/isAuth', authMiddleware, isAuth);

// to sign up
router.post('/add', signUp);

// to sign in
router.post('/login', signIn);

// to sign out
router.get('/logout', signOut);

// router exported to create related API in app.js which will be made available to the client 
module.exports = router;