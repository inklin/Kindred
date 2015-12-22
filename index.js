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
  
  server.auth.strategy('session', 'cookie', {
    password: 'ChangeThis',
    isSecure: 'false',
    redirectTo: '/login',
    clearInvalid: true,
    validateFunc: function(req, session, callback){
        db.Account.findById(session.id).then(function(account){
          if ( account ) {
            callback(null, true)
          } else {
            callback(null, false)
          }
        }, callback)
      }
  })
  // Set up routes
  server.route(routes);

  server.route({
    method: 'GET',
    path: '/application.js',
    handler: function(req, reply){
      reply.file('./public/application.js')
    }
  });

  server.route({
    method: 'GET',
    path: '/css/application.css',
    handler: function(req, reply){
      reply.file('./public/css/application.css')
    }
  });

  // Start your Server
  server.start(function () {
    console.log('Kindred is running on port:', PORT);
  });
});
