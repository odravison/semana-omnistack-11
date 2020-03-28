const express = require('express');
const routes = express.Router();

const IncidentsControler = require('../controllers/IncidentsControler');


// middleware that is specific to this router
routes.use(function timeLog(request, response, next) {
  console.log('On Incidents resource');
  console.log('Request endpoint:', request.method, request.originalUrl);
  console.log('Time: ', Date.now());
  next();
});

routes.route('/')
  .post(IncidentsControler.create)
  .get(IncidentsControler.list);

routes.route('/:id')
  .delete(IncidentsControler.delete);

module.exports = routes;