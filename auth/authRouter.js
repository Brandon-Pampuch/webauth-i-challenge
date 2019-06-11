const express = require("express")
const bcrypt = require("bcrypt");
const router = express.Router()
const Users = require("../users/users-model")



router.post("/register", (req, res) => {
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
  
  router.post("/login", (req, res) => {
    const { username, password } = req.body;
    Users.findBy({ username })
  
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.get("/logout", (req, res) => {
      if(req.session){
          req.session.destroy(err => {
            if(err) {
                res.json({message: "you cannot logout"})
            }else{
                res.status(200).json({message:"logged out"})
            }
          })
      }else{
          res.status(200).json({message: "you were never here to begin with"})
      }
  })

    
module.exports = router