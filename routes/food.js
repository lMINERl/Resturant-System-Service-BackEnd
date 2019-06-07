const mongoose = require('mongoose');
const express = require('express');
const createError = require('http-errors');
const FoodModel = require(`../models/food`);
const restaurantModel = require(`../models/restaurant`);
const validator = require('validator');
// authenticationMiddleware = require(`../middleware/foodAuthentication`);
const router = express.Router();
// base /food


// getAll
// getById
// Add
// Edit
// Delete

// get resturant's Menu
router.get('/restaurant/:_id', async (req, res, next) => {
    const restaurant = await restaurantModel.find({ _id: req.params._id }).catch(err => createError(400, err));
    const foodids = restaurant.map(r => r.foodids);
    
    const item = await FoodModel.find({ _id: { $in: [...foodids[0]] } }).catch(err => createError(400, err));
    res.send(item);
});

// protect endpoint using authentication middleware

module.exports = router;