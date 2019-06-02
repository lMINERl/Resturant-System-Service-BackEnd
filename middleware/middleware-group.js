const createError = require('http-errors');
const Group = require('../models/group');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
}
