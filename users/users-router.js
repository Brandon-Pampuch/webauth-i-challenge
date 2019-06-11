const express = require("express")
const router = express.Router()
const restrict = require("../auth/restricted")
const Users = require("./users-model")



router.get('/', restrict,  (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });


  
  
module.exports = router