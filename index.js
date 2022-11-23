const express = require('express');
const connection = require('./connection')
const user = require('./routes/user')
const product = require('./routes/product')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/user', user);
app.use('/product', product);
app.listen(3000)

module.exports = app;