const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.post('/signup', UserController.signup);
routes.post('/signin', UserController.signin);

routes.post('/users', UserController.create);
routes.get('/users', UserController.read);
routes.delete('/users/:id', UserController.delete);
routes.post('/update/:id', UserController.update);

routes.post('/raffle', UserController.raffle);

module.exports = routes;