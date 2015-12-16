var Hapi      = require('hapi');
var Joi       = require('joi');
var Boom      = require('boom');

var PORT      = process.env.PORT || 8000;
var server    = new Hapi.Server();
var db        = require('./models/index.js')

var plugins = [
  require('inert'),
];

server.register(plugins, function() {
  server.connection({ port: PORT });

  // Serve up all static content in public folder
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: {
      directory: {
        path: './public',
        listing: false,
        index: true,
      }
    }
  });

  // Start your Server
  server.start(function () {
    console.log('Kindred is running on port:', PORT);
  });
});
