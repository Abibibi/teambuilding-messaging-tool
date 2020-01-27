// requires
const pool = require('../config/database');
const promisePool = pool.promise();


// spaceController methods

// to add a new space
const addSpace = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');

    const name = req.body.name;
    const picture = url + '/public/' + req.file.filename;
    
    await promisePool.query(
        `INSERT INTO spaces (name, picture, users_id)
        VALUES (?, ?, ?)`,
        [name, picture, req.session.user.id]
    );
    
    // to-do: add the picture alt manually
    const insertedSpace = await promisePool.query(
        `SELECT id, name, picture, pictureAlt FROM spaces
        where name = ?
        AND users_id = ?`,
        [name, req.session.user.id]
    );

    res.json(insertedSpace);
};

module.exports = {
    addSpace
}