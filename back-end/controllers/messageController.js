// requires
const pool = require('../config/database');
const promisePool = pool.promise();


// messageController methods

// to send a message
const addMessage = async (req, res) => {
    const { spaceName, receiver, content } = req.body

    await promisePool.query(
        `INSERT
            INTO messages
                (content, spaces_id, sender_id, receiver_id)
        VALUES (
            ?,
            (SELECT id FROM spaces WHERE spaces.name = ?),
            ?,
            (SELECT id FROM users WHERE users.firstname = ?)
        )`,
        [content, spaceName, req.session.user.id, receiver]
    );

    res.json('Le nouveau message a bien été ajouté à la base de données.');
};

const receivedMessages = async (req, res) => {
    const [results] = await promisePool.query(
        `SELECT
            m.id,
            m.content,
            m.created_At as date,
            s.name as spaceName,
            u.firstname as receiver
        FROM
            messages as m
                JOIN spaces as s
                    ON m.spaces_id = s.id
                JOIN users as u
                    ON m.receiver_id = u.id
        WHERE
            m.receiver_id = ?
        AND
            s.name = ?`,
        [req.session.user.id, req.params.spaceName]
    );

    res.json(results)
};

const sentMessages = async (req, res) => {
    const [results] = await promisePool.query(
        `SELECT
            m.id,
            m.content,
            m.created_At as date,
            s.name as spaceName,
            u.firstname as receiver
        FROM
            messages as m
                JOIN spaces as s
                    ON m.spaces_id = s.id
                JOIN users as u
                    ON m.receiver_id = u.id
        WHERE
            m.sender_id = ?
        AND
            s.name = ?`,
        [req.session.user.id, req.params.spaceName]
    );

    res.json(results)
}


module.exports = {
    addMessage,
    receivedMessages,
    sentMessages
}