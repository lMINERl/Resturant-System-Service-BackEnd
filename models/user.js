const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = process.env.SALT_ROUND || 10;
const secretKey = process.env.SECRET_KEY || 'mySecretKey';
const tokenExpire = process.env.TOKEN_EXPIRE || '1h';
const createError = require('http-errors');
const {promisify}=require('util');
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);
const validator = require('validator');


const schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    favouriteFood: { type: Array }, //contains ids of foods unbinded
    favouriteResturant: { type: Array }, //contains ids of resturant unbinded
    groups: { type: Array }, //group ids
    ownedGroups: { type: Array }, //id group
    reviews: { type: Array }, // review[ { comment,rating} ]
    loyalityPoints: { type: Number },
    roles: { type: Array }, // allowance rules id
    cart: { type: Array }
},
    {
        toJSON: {
            hidden: ['password', '__v'], //to hide the password and other values from response
            transform: true,
        },
        autoIndex: true
    }
);

// apply the transform hide
schema.method('verifyPassword', function (password){
    const user  = this ; 
   const verify = bcrypt.compare(password , user.password) ;
   if(verify) {return true }else return false

    
})
schema.method('generateToken', function (compPassword){
    const user  = this ; 
  return sign({_id : user._id}, secretKey);

    
})
schema.static('getUserByToken', async function (token) {
    const decoded = await verify(token, secretKey);
    const user = await User.findById(decoded._id);
    if (!user) throw new Error('user not found');
    return user;
});
const hashPassword = (password)=> bcrypt.hash(password, saltRounds)
schema.pre('save', async function(){
    const user = this;
    if(user.isNew || user.modifiedPaths().includes('password'))
    {
       user.password =  await hashPassword(user.password)
    }

})
const User = mongoose.model('User', schema);
module.exports= User;