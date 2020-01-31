// requires
const pool = require('../config/database');
const promisePool = pool.promise();


// messageController methods

// to send a message
const addMessage = async (req, res) => {
    const { spaceName, receiver, content } = req.body

    await promisePool.query(
    `INSERT INTO messages
    (content, spaces_id, sender_id, receiver_id)
    VALUES (
        ?,
        (SELECT id FROM spaces WHERE spaces.name = ?),
        ?,
        (SELECT id FROM users WHERE users.firstname = ?)
    )    
    `,
    [content, spaceName, req.session.user.id, receiver]);

    res.json('Le nouveau message a bien été ajouté à la base de données.');
};

module.exports = {
    addMessage
}