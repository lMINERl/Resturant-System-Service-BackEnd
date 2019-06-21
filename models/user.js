const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const {Schema}=mongoose;
const userSchema = Schema({
    name: { type: String },
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
})
userSchema.pre('save',async function (next){
    //check new account or password is modified
    if(!this.isModified('password')){
        return next();
    }
    //encrpt password
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password,salt);
        this.password = hash;
        next();
    }catch(e){
        return next(e);
    }
})
userSchema.methods.isPasswordMatch = function(password,hashed,callback){
    bcrypt.compare(password,hashed,(err,success)=>{
        if(err){
            return callback(err);
        }
        callback(null,success)
    });
}
userSchema.methods.toJSON =function(){
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
}
const User =mongoose.model('User',userSchema) ;
module.exports=User;