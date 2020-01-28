// using express-promise-router to pass in async functions using a router in Express, and handle errors
const Router = require('express-promise-router');
const router = new Router();
const authMiddleware = require('../utils/authMiddleware');
const upload = require('../utils/fileUpload');

// Controller
const {
    addSpace,
    allSpaces,
    oneUserSpaces
} = require('../controllers/spaceController');

router.post('/addSpace', [authMiddleware, upload.single('image')], addSpace);

router.get('/allSpaces', allSpaces);

router.get('/oneUserSpaces', oneUserSpaces);

module.exports = router;