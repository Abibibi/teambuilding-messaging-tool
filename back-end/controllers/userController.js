// requires
const pool = require('../config/database');
const promisePool = pool.promise();
const bcrypt = require('bcrypt');


// userController methods

// to sign up
const signUp = async (req, res) => {
  const firstname = req.body.firstname;
  const email = req.body.email;
  let password = req.body.password;

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


// to sign in
const signIn = async (req, res) => {
  const { email, password } = req.body

  const [results] = await promisePool.query(
      `SELECT * FROM users WHERE email=? LIMIT 1`,
      [email]
  );
  
  const tryingUser = results[0];

  // if user has not signed up
  if(!tryingUser) {
    return res.status(400).send({ nonExistingUser: 'L\'utilisateur ne s\'est pas inscrit.' })
  }
  
  else if
  // if user's pwd matches the crypted one in DB
  (await bcrypt.compare(password, tryingUser.password)) {
    // user successfully signs in
    // a session is created with all the info needed as long as the user is logged
    const sessionUserInfo = {
      id: tryingUser.id,
      firstname: tryingUser.firstname,
      email: tryingUser.email
    }

    req.session.user = sessionUserInfo;

    // session info is sended to client
    return res.json(sessionUserInfo);
  } 

  // if user's pwd does not match the crypted one in DB
  else {
    return res.status(400).send({ wrongPassword: 'L\'utilisateur n\'a pas renseigné le bon mot de passe.' })
  }
  
};


module.exports = {
    signUp,
    signIn
}