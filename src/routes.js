const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.post('/login', UserController.login);
routes.post('/signup', UserController.signup);
routes.get('/user', UserController.verifyToken, UserController.searchUser);

module.exports = routes;