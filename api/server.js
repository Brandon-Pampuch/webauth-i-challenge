const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt')
const Users = require('../users/users-model')

const server = express();



server.use(helmet());
server.use(express.json());

server.post('/api/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password,8)
  
    user.password = hash
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;