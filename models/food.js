const mongoose = require("mongoose");
const createError = require("http-errors");

const foodSchema = new mongoose.Schema({
    name: { type: String },
    discountPrice: { type: Number },
    price: { type: Number },
    avgRating: { type: Number },
    sizes: { type: Array },
    ingredients: { type: Array },
    categoryId: { type: Number },
    comments: { type: Array },
    imgUrl: { type: String },
    isOnSale: { type: Boolean },
    tags: { type: Array }
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