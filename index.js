var Hapi      = require('hapi');
var Joi       = require('joi');
var Boom      = require('boom');
var bcrypt    = require('bcrypt');

var PORT      = process.env.PORT || 8000;
var server    = new Hapi.Server();
var db        = require('./models/index.js');

var plugins = [
  require('inert'),
  require('hapi-auth-cookie')
];

var validateLogin = function(request, reply){
  var username = request.payload.username
  var password = request.payload.password

  db.Account.findAll({
    where: {
      username: username
    }
  }).then(function(data){
    if ( data.length !== 0 ){
      var account = data[0]

      bcrypt.compare(password, account.password, function(err, res){
        if (err) {
          console.log(err)
          reply(Boom.badRequest())
        }

        if (res){ 
          request.auth.session.set({id: account.id})
          reply('You are now logged in as ' + username)
        } else {
          reply('Failure')
        }
      })
    } else {
      reply(Boom.notFound())
    }
  }, console.log)
}

server.connection({ port: PORT });

server.register(plugins, function() {
  
  server.auth.strategy('session', 'cookie', {
    password: 'ChangeThis',
    isSecure: 'false',
    redirectTo: '/login',
    clearInvalid: true,
    validateFunc: function(request, session, callback){
        db.Account.findById(session.id).then(function(account){
          if ( account ) {
            callback(null, true)
          } else {
            callback(null, false)
          }
        }, callback)
      }
  })

  server.route({
    method: 'GET',
    path: '/application.js',
    handler: function(request, reply){
      reply.file('./public/application.js')
    }
  });

  server.route({
    method: 'GET',
    path: '/css/application.css',
    handler: function(request, reply){
      reply.file('./public/css/application.css')
    }
  });

  server.route({
    method: 'GET',
    path: '/login',
    handler: function(request, reply){
      reply.file('./public/login.html')
    }
  });

  server.route({
    method: 'POST',
    path: '/login',
    config: {
      handler: function(request, reply){
        validateLogin(request, reply);
      }  
    }
  })

  server.route({
    method: 'GET',
    path: '/logout',
    config: {
      handler: function(request, reply){
        request.auth.session.clear()
        reply('logged out')
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/accounts',
    config: {
      handler: function(request, reply){
        var username = request.payload.username
        var password = request.payload.password

        db.Account.findAll({
          where: {
            username: username
          }
        }).then(function(data){
          if ( data.length === 0 ){
            bcrypt.genSalt(10, function(err, salt){
              bcrypt.hash(password, salt, function(err, res){
                db.Account.create({
                  username: username,
                  password: res
                }).then(function(data){
                  reply(data)
                }, function(err){
                  reply(err.message)
                })
              })
            })
            
          } else {
            reply('duplicate acc')
          }
        }, reply)
      }  
    }
    
  });

  server.route({
    method: 'GET',
    path: '/{all*}',
    config: {
      auth: 'session',
      handler: function(request, reply){
        reply.file('./public/index.html')
      }
    }
  });


  // Start your Server
  server.start(function () {
    console.log('Kindred is running on port:', PORT);
  });
});
