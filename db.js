const mongoose = require('mongoose');
const connection = process.env.MONGO_URL || 'mongodb://localhost:27017/db_resturant';

mongoose.connect(connection, { useCreateIndex: true, useNewUrlParser: true, autoIndex: true }, err => { if (err) console.error(err) });