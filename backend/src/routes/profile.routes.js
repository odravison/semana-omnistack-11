const express = require('express');
const routes = express.Router();

const ProfileController = require('../controllers/ProfileController');


// middleware that is specific to this router
routes.use(function timeLog(request, response, next) {
  console.log('On Profile resource');
  console.log('Request endpoint:', request.method, request.originalUrl);
  console.log('Time: ', Date.now());
  next();
});

routes.route('/')
  .post(ProfileController.create);

module.exports = routes;