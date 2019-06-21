const passport = require('passport');
// cross origin
const cors = require('cors');
//database
require(`./db.js`);

var express = require('express');
var path = require('path');
var logger = require('morgan');
require('./config')(passport);
// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var restaurantRouter = require('./routes/restaurant');
var promotionRouter = require('./routes/promotion');
var foodRouter = require('./routes/food');
var app = express();

app.use(cors()); //use cros
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurant', restaurantRouter);
app.use('/food',foodRouter);
app.use('/promotion', promotionRouter);
//--------------- Errors -------------------
app.use((req,res,next)=>{ //404 not found
    //res.status(404).send({message:'not found'})
    var err = new Error('not found');
    err.status = 404;
    next(err);
})
app.use((err,req,res,next)=>{ //global error handler
   
    const status = err.status || 500; //internal server error
    const error = err.message || 'error processing your request';
    res.status(status).send({error})
})
module.exports = app;
