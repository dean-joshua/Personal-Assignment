const routes = require('express').Router();
const name = require('../controllers/');

routes.get('/', name.displayName);

module.exports = routes;