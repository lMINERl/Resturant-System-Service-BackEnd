const mongoose = require("mongoose");
const createError = require("http-errors");
const validator = require('validator');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        validate: validator.isAscii
    },
    email: {
        type: String, required: true,
        validate: validator.isEmail
    },
    phone: {
        type: String, required: true,
        validate: (input) => validator.isMobilePhone(input, 'ar-EG')
    },
    foodids: {
        type: Array,
        validate: (input) => input.every(v => validator.isMongoId(v))
    },
    rating: {
        type: Number,
        default: 0,
        validate: (input) => input < 5 && input > -1
    },
    tags: {
        type: Array,
        validate: (input) => input.length < 10 && input.every(v => isNaN(v) === true),
    },
    categories: {
        type: Array, required: true,
        validate: (input) => input.every(c => validator.isAscii(c))
    },
    location: {
        type: String, required: true,
        validate: (input) => validator.isAscii(input) && validator.isLength(input, { max: 30, min: 0 })
    },
    comments: { //{userID , comment number}
        type: Array,
        validate: (input) => input.every(v => validator.isMongoId(v))
    },
    description: {
        type: String,
        validate: (input) => validator.isAscii(input) && validator.isLength(input, { max: 30, min: 0 })
    },
}, {
        toJSON: {
            hidden: ['__v'],
            transform: true
        }
    }
);
restaurantSchema.options.toJSON.transform = function (doc, ret, options) {
    try {
        if (Array.isArray(options.hidden)) {
            options.hidden.forEach((prop) => { delete ret[prop]; });
        }
    } catch (err) {
        createError(err);
    }
    return ret;
}
restaurantSchema.pre('save', async function () {
    const resturant = this;
});

const restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurant;