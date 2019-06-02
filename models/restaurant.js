const mongoose = require("mongoose");
const createError = require("http-errors");

const restaurantSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    foodids: { type: Array },
    rating: { type: Number },
    tags: { type: Array },
    categoryid: { type: Array },
    location: { type: String },
    comments: { type: Array },
    description: { type: String },
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