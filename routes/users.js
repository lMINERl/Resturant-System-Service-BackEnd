const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user');
const passport = require('passport')
const authenticationMiddleware = require('../middleware/authentication');

/* registration */
router.post('/register',  async (req, res, next)=>  {
    const {name,email,password,joined}= req.body;
    const newUser = new User({
        name,
        email,
        password,
        joined
    });
    try{
        const user = await newUser.save();
        return res.send({user})
    }catch(e){
      next(createError(404,err.message));
    }
  
});
// login
router.post('/authentication',  async (req, res, next)=>  {
  try{
    const {email , password} = req.body;
    if(!email || !password)
    {
      console.log('auth failed');
    }
    const user = await User.findOne({email});
    if(!user) console.log('NOT FOUND');
  
  const isMatch = await user.verifyPassword(password);
  if(!isMatch) console.log('NOT MATCHED');
  
  const token = await user.generateToken();
  res.send({
    token ,
    user
  })
  }
    catch (err){
       next(createError(400 , err))
    }
  
});

router.use(authenticationMiddleware);

router.get('/profile', (req, res , next) => {
  const{user}=req;
  res.send({user})
  
});


module.exports = router;
