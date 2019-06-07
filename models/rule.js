const mongoose = require("mongoose");
const createError = require("http-errors");

const ruleSchema = new mongoose.Schema({
    ruleName: {
        type: String
    }

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
const rule = mongoose.model('rule', ruleSchema);
module.exports = rule;