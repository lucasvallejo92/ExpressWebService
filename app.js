// ===================================================
//  << Index App File >>
// ===================================================
//  Version: 1.0.0
//  Author: Lucas Vallejo
//  Email: lucasvallejo92@gmail.com
// ===================================================
//  Imports ->
// ===================================================

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// ===================================================
//  Body Parser Middleware Configuration ->
// ===================================================

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// ===================================================
//  Mongoose Connection ->
// ===================================================

mongoose.connection.openUri('mongodb://localhost:27017/blogDB', (err, res) => {
    if(err) throw err;
    console.log('[DATABASE: ONLINE] Database server online on port 27017');
});

// ===================================================
//  Importing Routes ->
// ===================================================

const appRoutes = require('./routes/app');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// ===================================================
//  Starting Express Server ->
// ===================================================

app.listen(3000, () => {
    console.log('[SERVER: ONLINE] Express server running on port 3000');
});