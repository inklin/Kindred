var accountHandler = require('../handlers/account.js');

module.exports = [
  {
    method: 'PUT',
    path: '/accounts',
    handler: function(req, reply) {
      reply('Put request received by accounts/ : ' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler: function(request, reply) {
        reply.file('./public/login.html');
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      handler: function(request, reply) {
        accountHandler.validateLogin(request, reply);
      }
    }
  },
  {
    method: 'POST',
    path: '/logout',
    config: {
      handler: function(request, reply) {
        request.auth.session.clear();
        reply();
      }
    }
  },
  {
    method: 'POST',
    path: '/accounts',
    config: {
      auth: false,
      handler: function(request, reply) {
        accountHandler.createNewAccount(request, reply);
      }
    }
  }
]