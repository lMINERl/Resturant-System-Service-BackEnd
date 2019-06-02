const mongoose = require("mongoose");
const createError = require("http-errors");

const groupSchema = new mongoose.Schema({
    name: { type: String },
    imageUrl: { type: String },
    shareLink: { type: String },
    initiateOrder: { type: Date },
    deliveryLocation: { type: String },
    orderedFoods: { type: Array },
    resturantId: { type: Number },
    users: { type: Array }, //list of users id
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