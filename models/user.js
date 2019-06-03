const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = process.env.SALT_ROUND || 10;
const secretKey = process.env.SECRET_KEY || 'mySecretKey';
const tokenExpire = process.env.TOKEN_EXPIRE || '1h';
const createError = require('http-errors');

const schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    favouriteFood: { type: Array }, //contains ids of foods unbinded
    favouriteResturant: { type: Array }, //contains ids of resturant unbinded
    groups: { type: Array }, //group ids
    ownedGroups: { type: Array }, //id group
    reviews: { type: Array }, // id of reviews
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
schema.options.toJSON.transform = function (doc, ret, options) {
    try {
        if (Array.isArray(options.hidden)) {
            options.hidden.forEach((prop) => { delete ret[prop]; });
        }
    } catch (err) {
        createError(err);
    }
    return ret;
}
const hashPassword = password => bcrypt.hash(password, saltRounds);


schema.pre('save', async function () {
    const user = this;
    if (user.isNew || user.modifiedPaths().includes('password')) {
        user.password = await hashPassword(user.password)
    }
});

schema.method('verifyPassword', function (comparePassword) {
    return bcrypt.compare(comparePassword, this.password);
});


schema.method('generateToken', async function () {
    let token;
    try {
        const user = this;
        await new Promise((r, rj) => { r(jwt.sign({ _id: user.id }, secretKey, { expiresIn: tokenExpire })) })
            .then((v) => { token = v });
    } catch (err) {
        createError(err);
    }
    return token;
});

schema.static('decodeToken', async function (token) {
    let result;
    await new Promise((r, rj) => { r(jwt.verify(token, secretKey)) })
        .then((v) => {
            result = v;
        })
        .catch(createError);
    return result;
});

const User = mongoose.model('user', schema);
module.exports = User;