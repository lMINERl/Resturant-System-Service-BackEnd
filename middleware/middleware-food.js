const createError = require('http-errors');
const Food = require('../models/food');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
}
