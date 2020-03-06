// requires
require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient(process.env.REDIS_URL);

// express is called to create app
const app = express();


// Middlewares
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new redisStore({
    client: client
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production'
  }
}));

app.use('/public', express.static('public'));

// ROUTES & API

// Routers are required
const usersRouter = require('./routes/users');
const spacesRouter = require('./routes/spaces');
const messagesRouter = require('./routes/messages');

// APIs associated with each Router (and routes included)
app.use('/users', usersRouter);
app.use('/spaces', spacesRouter);
app.use('/messages', messagesRouter);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})