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
        `INSERT INTO spaces (name, picture, creator_id)
        VALUES (?, ?, ?)`,
        [name, picture, req.session.user.id]
    );
    
    // to-do: add the picture alt manually
    const insertedSpace = await promisePool.query(
        `SELECT id, name, picture, pictureAlt, creator_id FROM spaces
        where name = ?
        AND creator_id = ?`,
        [name, req.session.user.id]
    );
    
    // creating the many-to-many relationship between users and spaces
    // (creator_id foreign key in spaces table is not enough
    // to establish the spaces - users relationship,
    // since many users may be in one space - and one user
    // may belong to multiple spaces)
    await promisePool.query(
        `INSERT INTO users_have_spaces (users_id, spaces_id)
        VALUES (?, ?)`,
        [req.session.user.id, insertedSpace[0][0].id]
    );

    res.json(insertedSpace);
};

const allSpaces = async (req, res) => {
    [results] = await promisePool.query(
        `SELECT id, name FROM spaces`
    )
    
    res.json(results)
};

const oneUserSpaces = async (req, res) => {
    [results] = await promisePool.query(
        `SELECT s.id, s.name, s.picture, s.pictureAlt
        FROM spaces as s
        INNER JOIN users_have_spaces as us
        on s.id = us.spaces_id
        WHERE us.users_id = ?`,
        [req.session.user.id]
    )
    
    res.json(results)
};

const findSpaceToJoin = async (req, res) => {
    [results] = await promisePool.query(
        `SELECT s.id, s.name, s.picture, s.pictureAlt, u.firstname spaceCreator
        FROM users as u
        LEFT JOIN spaces as s
        ON u.id = s.creator_id
        WHERE s.name = ?`,
        [req.params.spaceName]
    )

    res.json(results[0])
};

module.exports = {
    addSpace,
    allSpaces,
    oneUserSpaces,
    findSpaceToJoin
}