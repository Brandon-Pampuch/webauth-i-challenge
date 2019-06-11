const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcrypt");

const Users = require("../users/users-model");
const usersRouter = require("../users/users-router")

const server = express();

server.use(helmet());
server.use(express.json());


//add these to auth router
server.post("/api/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post("/api/login", (req, res) => {
  const { username, password } = req.body;
console.log(password)
  Users.findBy({ username })

    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
server.use('/api/users', usersRouter)





module.exports = server;
