const createError = require('http-errors');
const Rule = require('../models/rule');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
}
