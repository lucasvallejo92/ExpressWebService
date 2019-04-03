const express = require('express');
const app = express();
const userController = require('../controllers/userController');

// ===================================================
//  Get all Users ->
// ===================================================
app.get('/', userController.getUsers);

// ===================================================
//  Update an User ->
// ===================================================
app.put('/:id', userController.editUser);

// ===================================================
//  Create an User ->
// ===================================================
app.post('/', userController.createUser);

// ===================================================
//  Delete an User ->
// ===================================================
app.delete('/:id', userController.deleteUser);


module.exports = app;