var Hapi      = require('hapi');
var Joi       = require('joi');
var Boom      = require('boom');

var PORT      = process.env.PORT || 8000;
var server    = new Hapi.Server();
var db        = require('./models/index.js')

var routes    = require('./lib/routes');

var plugins = [
  require('inert'),
];

server.register(plugins, function() {
  server.connection({ port: PORT });

  // Set up routes
  server.route(routes);

  // Start your Server
  server.start(function () {
    console.log('Kindred is running on port:', PORT);
  });
});
