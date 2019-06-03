const express = require('express');
const createError = require('http-errors');
const promotionModel = require(`../models/promotion`);
const restaurantMiddleware = require(`../middleware/middleware-promotion`);
const router = express.Router();
// base /promotion

// get all promotions for listing
router.get('/', async (req, res, next) => {
    const item = await promotionModel.find().catch(err => createError(400, err));

    const items = item.map(r => {
        return {
            _id: r.id,
            resPromotion: r.resPromotion,
            foodPromotion: r.foodPromotion,
            topratedRes: r.topratedRes,
            topratedFood: r.topratedFood,
        };
    });
    res.send(items);
});

// get promotion by Id
router.get('/:_id', async (req, res, next) => {
    const item = await promotionModel.findById(req.params._id).catch(err => createError(400, err));
    res.send(item);
});

// add promotion
router.post('/', async (req, res, next) => {
    const promotion = new promotionModel(req.body);
    promotion.save((err) => {
        if (err) {
            return next(createError(400, err));
        };
        res.send(promotion);
    });
});

// edit promotion
router.post('/:_id', async (req, res, next) => {
    const updatedRestaurant = await promotionModel.findOneAndUpdate({ _id: req.params._id }, (err, res) => {
        if (err) return next(createError(500, err));
        return res.send("succesfully saved");
    }).catch(err => createError(400, err));
});

// delete promotion
router.delete('/:_id', async (req, res, next) => {
    const item = await promotionModel.deleteOne({ _id: req.params._id }).catch(err => createError(400, err));
    res.send(item);
});
// protect endpoint using authentication middleware
module.exports = router;
/* post
{
	"resPromotion":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
    "foodPromotion": ["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
    "topratedRes":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
    "topratedFood": ["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
}
*/

/* Update
    http://localhost:3000/promotion/5cf4fb8ae8aedb4424bfc90f
{
    "resPromotion":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
    "foodPromotion": ["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
    "topratedRes":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
    "topratedFood": ["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
}
*/

/* get
    http://localhost:3000/promotion/
[
    {
        "_id":"5cf4fb8ae8aedb4424bfc90f"
        "resPromotion":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
        "foodPromotion": ["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
        "topratedRes":["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
        "topratedFood": ["5cf4fb8ae8aedb4424bfc90f","5cf4fb8ae8aedb4424bfc90f"],
    }
]
*/