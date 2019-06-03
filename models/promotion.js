const mongoose = require("mongoose");
const createError = require("http-errors");

const promotionSchema = new mongoose.Schema({
    resPromotion: {
        type: Array, required: false,
        validate: (input) => input.length < 5 && input.every(v => validator.isMongoId(v))
    },
    foodPromotion: {
        type: Array, required: false,
        validate: (input) => input.length < 5 && input.every(v => validator.isMongoId(v))
    },
    topratedRes: {
        type: Array, required: true,
        validate: (input) => input.length < 5 && input.every(v => validator.isMongoId(v))
    },
    topratedFood: {
        type: Array, required: true,
        validate: (input) => input.length < 5 && input.every(v => validator.isMongoId(v))
    },
}, {
        toJSON: {
            hidden: ['__v'],
            transform: true
        }
    }
);
promotionSchema.options.toJSON.transform = function (doc, ret, options) {
    try {
        if (Array.isArray(options.hidden)) {
            options.hidden.forEach((prop) => { delete ret[prop]; });
        }
    } catch (err) {
        createError(err);
    }
    return ret;
}
promotionSchema.pre('save', async function () {
    const promotion = this;
});

const promotion = mongoose.model('promotion', promotionSchema);
module.exports = promotion;