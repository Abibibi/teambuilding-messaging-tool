const multer = require('multer');
const uuidv4 = require('uuid/v4');
// created public directory
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, DIR);
    },

    filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    // using uuid to make sure each uploaded image has a unique name
    // and thus avoid collisions
    cb(null, uuidv4() + '-' + fileName)
    }
});
     
const upload = multer({
    storage: storage,
    
    fileFilter: (req, file, cb) => {
        // to only upload files with specific MIME types
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
        } else {
        cb(null, false);
        return cb(new Error('Seuls les formats .png, .jpg and .jpeg sont acceptés.'));
        }
    }
});

module.exports = upload;