const express = require("express")

const Users = require("./users-model")

const router = express.router


router.get('/api/users', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  
  
