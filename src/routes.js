const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.post('/signup', UserController.signup);
routes.post('/signin', UserController.signin);

module.exports = routes;