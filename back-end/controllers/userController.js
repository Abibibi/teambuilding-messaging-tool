// requires
const pool = require('../config/database');
const bcrypt = require('bcrypt');


// userController methods

// to sign up
const signUp = async (req, res) => {
    const firstname = req.body.firstname;
    const email = req.body.email;
    let password = req.body.password;

    const promisePool = pool.promise();

    const [results] = await promisePool.query(
        `SELECT * FROM users WHERE email=? LIMIT 1`,
        [email]
    );
    
    const tryingUser = results[0];

    // if user is already in DB (thus, has already signed up)
    if (tryingUser) {
      return res.status(400).send({ alreadySignedUp: 'L\'utilisateur est déjà inscrit.' });
    }
  
    // if user not already in DB, adding them to DB
    // to hash pwd before it is added in DB
    const hash = await bcrypt.hash(password, 10);
    password = hash;
  
    await promisePool.query(
        `INSERT INTO users (firstname, email, password)
        VALUES (?, ?, ?)`,
        [firstname, email, password]
    );
    
    return res.send('Inscription effectuée');  
  };


module.exports = {
    signUp
}