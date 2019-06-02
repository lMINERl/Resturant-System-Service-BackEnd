const createError = require('http-errors');
const Restaurant = require('../models/restaurant');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
}
