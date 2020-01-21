// requires
require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const cors = require('cors');
const session = require('express-session');


// express is called to create app
const app = express();


// Middlewares
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production'
    }
  })
);


// ROUTES & API

// Routers are required
const usersRouter = require('./routes/users');

// APIs associated with each Router (and routes included)
app.use('/users', usersRouter);


// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})