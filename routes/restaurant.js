const express = require('express');
const createError = require('http-errors');
const restaurantModel = require(`../models/restaurant`);
const foodModel = require('../models/food');
const restaurantMiddleware = require(`../middleware/middleware-restaurant.js`);
const router = express.Router();
// base /resturant

// get all restaurants for listing
router.get('/', async (req, res, next) => {
    const item = await restaurantModel.find().catch(err => createError(400, err));
    const items = item.map(r => {
        return {
            _id: r.id,
            name: r.name,
            rating: r.rating,
            description: r.description
        };
    });
    res.send(items);
});

// get restaurant by Id
router.get('/:_id', async (req, res, next) => {
    const item = await restaurantModel.findById(req.params._id).catch(err => createError(400, err));
    res.send(item);

});

// add restaurant
router.post('/', async (req, res, next) => {
    const restaurant = new restaurantModel(req.body);
    restaurant.save((err) => {
        if (err) {
            return next(createError(400, err));
        };
        res.send(restaurant);
    });
});

// edit restaurant
router.post('/:_id', async (req, res, next) => {
    const updatedRestaurant = await restaurantModel.findOneAndUpdate({ _id: req.params._id }, (err, res) => {
        if (err) return next(createError(500, err));
        return res.send("succesfully saved");
    }).catch(err => createError(400, err));
});

// delete restaurant
router.delete('/:_id', async (req, res, next) => {
    const item = await restaurantModel.deleteOne({ _id: req.params._id }).catch(err => createError(400, err));
    res.send(item);
});

// protect endpoint using authentication middleware
module.exports = router;
/* post
{
	"name":"Restaurant1",
	"email":"me@example.com",
	"phone":"+201073822925",
	"foodids":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
	"tags":["tag1","tag2"],
	"categories":["category1","category2"],
	"location":"this str is about location",
	"rating":1,
	"comments":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
	"description":"this str is about description"
}
*/

/* Update
    http://localhost:3000/restaurant/5cf4fb8ae8aedb4424bfc90f
{
	"name":"Restaurant1",
	"email":"me@example.com",
	"phone":"+201073822925",
	"foodids":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
	"tags":["tag1","tag2"],
	"categories":["category1","category2"],
	"location":"this str is about location",
	"rating":1,
	"comments":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
	"description":"this str is about description"
}
*/

/* get
    http://localhost:3000/restaurant/
[
    {
        "_id":"5cf4fb8ae8aedb4424bfc90f"
        "name":"Restaurant1",
        "rating":1,
        "description":"this str is about description"
    }
]
*/