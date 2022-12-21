const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.post('/users', UserController.create);
routes.get('/users', UserController.read);
routes.get('/usersGift', UserController.readGift);
routes.get('/usersGifted', UserController.readGifted);
routes.delete('/users/:id', UserController.delete);
routes.post('/update/:id', UserController.update);
routes.post('/updateGift/:id', UserController.gift);
routes.post('/updateGifted/:id', UserController.gifted);

module.exports = routes;