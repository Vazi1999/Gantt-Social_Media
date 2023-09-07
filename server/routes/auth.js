const express = require('express');
const router = express.Router();
require('dotenv').config(); // .env configuration
const Users = require('../models/users');
const jwtMiddleware = require('../middleware/authorization');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/api/login', async (req, res) => {
    const {username , password} = req.body;
    const DBuser = await Users.findOne({username:username})
    if(DBuser == null) res.status(404).json({ message: "User not found" });
    else
    {
      try {
        if(await bcrypt.compare(password , DBuser.password))
        {
          // creating jwt token.
          const accessToken = jwt.sign({username:username}, process.env.ACCESS_TOKEN , {expiresIn:'24h'}) // seralize the username.
          if(username == "Shaked") // Only Shaked is Administrator.
          {
            req.session.userData.IsAdmin = true;
          }
          req.session.userData.WhichUser = DBuser.id; // update which user is logged in.
          res.status(200).json({accessToken :accessToken }); // returns the token
        }
        else{
          res.status(404).json({ message: "Wrong username or password" })
        }
      } catch (err) {
        console.log(err)
      }
    }
  });



  router.post('/api/register',jwtMiddleware , async (req, res) => {
    const {username, password} = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password,10);
      const highestIdUser = await Users.findOne().sort('-id');
      const newId = highestIdUser ? highestIdUser.id + 1 : 1;
      const user = await Users.create({id:newId , username:username , password:hashedPassword});
      console.log("User created");
      res.status(200).json();
    } catch (error) {
      console.log(error)
      res.status(500).json({message:"Somthing went wrong.."});
    }
  });


  router.get('/api/Authorize',jwtMiddleware , async (req, res) => {
    const user = await Users.findOne({id:req.session.userData.WhichUser})
    res.status(200).json({admin:req.session.userData.IsAdmin , user:user.username});
  });


  module.exports = router;