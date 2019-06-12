const express = require("express");
const helmet = require("helmet");

const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);


const usersRouter = require("../users/users-router")
const authRouter = require("../auth/authRouter")

const server = express();

const sessionConfig = {
  name: 'monkey', // by default it would be sid
  secret: 'keep it secret, keep it safe!',
  resave: false, // if there are no changes to the session don't save it,
  saveUninitialized: true, // for GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 10, // in milliseconds
    secure: false, // send cookie only over https, set to true in production
    httpOnly: true, // always set to true, it means client JS can't access the cookie
  },
  store: new knexSessionStore({
    knex:require('../data/dbConfig'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  })
};



server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))


//add these to auth router

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

module.exports = server;
