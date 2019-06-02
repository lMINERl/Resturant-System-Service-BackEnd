const mongoose = require("mongoose");
const createError = require("http-errors");

const promotionSchema = new mongoose.Schema({
    resPromotion: { type: Array },
    foodPromotion: { type: Array },
    topratedRes: { type: Array },
    topratedFood: { type: Array },
}, {
        toJSON: {
            hidden: ['__v'],
            transform: true
        }
    }
);
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