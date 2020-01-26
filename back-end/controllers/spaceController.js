// requires
const pool = require('../config/database');
const promisePool = pool.promise();


// spaceController methods

// to add a new space
const addSpace = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');

    console.log(req.file);
    console.log(req.body.name);
    
};

module.exports = {
    addSpace
}