const express = require('express');
const connection = require('./connection')
const user = require('./routes/user')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/user', user)
app.listen(3000)

module.exports = app;