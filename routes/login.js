const express = require('express');
const app = express();
const loginController = require('../controllers/loginController');

// ===================================================
//  Login ->
// ===================================================
app.post('/', loginController.login);


module.exports = app;