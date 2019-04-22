  // init first
  require('dotenv').config();
  require('module-alias/register');

  // requires
  const express = require('express');
  const bodyParser = require('body-parser');
  const helmet = require('helmet');
  const  { Model } = require('objection');
  const knex = require('knex')(require('../config/database').knex);
  const logger = require('knex-logger');
  const userController = require('../controllers/users')
  // ports, app initialization
  const PORT = process.env.PORT || 5000;
  const app = express();
  Model.knex(knex);
  
  // middlewares
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, refresh");
    next();
  });
  
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));	 
  app.use(bodyParser.json());
  
  if(process.env.ENV === 'development') {
    app.use(logger(knex));
  }

  app.listen(PORT);
  console.log('server is running on port '+ PORT)

  app.use(userController.getAllUsers)
