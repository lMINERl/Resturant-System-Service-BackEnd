const mongoose = require("mongoose");
const createError = require("http-errors");

const ingredientSchema = new mongoose.Schema({
    name: { type: String }
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
const ingredient = mongoose.model('ingredient', ingredientSchema);
module.exports = ingredient;