// cross origin
const cors = require('cors');

//database
require(`./db.js`);

var express = require('express');
var path = require('path');
var logger = require('morgan');

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var restaurantRouter = require('./routes/restaurant');

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

// error display
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.code || 500);
    res.send(err);
});
module.exports = app;
