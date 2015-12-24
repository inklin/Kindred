var Hapi      = require('hapi');
var Joi       = require('joi');
var Boom      = require('boom');
var bcrypt    = require('bcrypt');

var PORT      = process.env.PORT || 8000;
var server    = new Hapi.Server();
var db        = require('./models/index.js');

var routes    = require('./lib/routes');

var plugins = [
  require('inert'),
  require('hapi-auth-cookie')
];

server.connection({ port: PORT });

server.register(plugins, function() {
  
  server.auth.strategy('session', 'cookie', true, {
    password: 'ChangeThis',
    isSecure: 'false',
    redirectTo: '/login',
    clearInvalid: true,
    validateFunc: function(req, session, callback){
        db.Account.findById(session.id).then(function(account){
          if ( account ) {
            req.currentUser = account;            
            callback(null, true);
          } else {
            callback(null, false);
          }
        }, callback)
      }
  })
  // Set up routes
  server.route(routes);

  server.route({
    method: 'GET',
    path: '/application.js',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/application.js')
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/js/material.js',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/js/material.js')
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/css/styles.css',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/css/styles.css')
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/css/material.css',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/css/material.css')
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    config: {
      auth: false,
      handler: function(req, reply){
        reply()
      }
    }
  });

  // Start your Server
  server.start(function () {
    console.log('Kindred is running on port:', PORT);
  });
});
