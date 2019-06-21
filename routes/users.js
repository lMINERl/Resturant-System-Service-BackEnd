const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user');
const passport = require('passport')
const authenticationMiddleware = require('../middleware/authentication');
const jwt = require('jsonwebtoken');
/* registration */
router.post('/register',  async (req,res,next)=>{
  const {name,email,password}= req.body;
  const newUser = new User({
      name,
      email,
      password
  });
  try{
    const userr = await User.findOne({email});
    if(!userr){
        const user = await newUser.save();
        return res.send({user})
        
    }else{
      const err = new Error(`the email ${email} already exists`);
        err.status = 401;
        next(err);
    }
  }catch(e){
      next(e);
  }
}
);
// login
router.post('/authentication', async (req,res,next)=>{
  //password, username in request
  const {email,password} = req.body;
  try{
      //check password,username is ok
      const user = await User.findOne({email});
      if(!user){
          const err = new Error(`the email ${email} was not found`);
          err.status = 401;
          next(err);
      }
      user.isPasswordMatch(password,user.password,(err,matched)=>{
          if(matched){
              //if credintials ok, create JWT and return it
              //return res.send({message:'you can login'});
              //secret
              //expiration
              const secret = process.env.JWT_SECRET || 'thisistopsecret';
              const expire = process.env.JWT_EXPIRATION || 3600;
              const token = jwt.sign({_id:user._id},secret,{expiresIn:expire});
              return res.send({token});
          }
          res.status(401).send({error:'invalid username/password'})
      })
  }catch(e){
      next(e)
  }
  
})

router.all('*',(req,res,next)=>{
  passport.authenticate('jwt',{session:false},(err,user)=>{
      if(err || !user){
          const error = new Error('you are not authorized to access this area');
          error.status=401;
          throw error;
      }
      req.user = user;
      return next();
  })(req,res,next);
})
router.get('/test',(req,res,next)=>{
  return res.send({message:'hi you are authenticated',user:req.user})
});

router.get('/profile', (req, res , next) => {
  const{user}=req;
  res.send({user})
  
});


module.exports = router;
