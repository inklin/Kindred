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
  require('hapi-auth-cookie'),
  require('blipp')
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

  // Start your Server
  server.start(function () {
    console.log('Kindred is running on port:', PORT);
  });
});
