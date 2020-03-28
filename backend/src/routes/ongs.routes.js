const express = require('express');
const routes = express.Router();

const OngController = require('../controllers/OngController');


// middleware that is specific to this router
routes.use(function timeLog(request, response, next) {
  console.log('On Incidents resource');
  console.log('Request endpoint:', request.method, request.originalUrl);
  console.log('Time: ', Date.now());
  next();
});

routes.route('/')
  .post(OngController.create)
  .get(OngController.list);

module.exports = routes;