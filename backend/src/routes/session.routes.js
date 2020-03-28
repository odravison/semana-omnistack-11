const express = require('express');
const routes = express.Router();

const SessionController = require('../controllers/SessionController');

// middleware that is specific to this router
routes.use(function timeLog(request, response, next) {
  console.log('On Sessions resource');
  console.log('Request endpoint:', request.method, request.originalUrl);
  console.log('Time: ', Date.now());
  next();
});

routes.route('/')
  .post(SessionController.create);

module.exports = routes;