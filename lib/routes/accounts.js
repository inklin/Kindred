var accountHandler = require('../handlers/account.js');

module.exports = [
  {
    method: 'PUT',
    path: '/accounts',
    handler: function(req, reply) {
      reply('Put req received by accounts/ : ' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler: function(req, reply) {
        reply.file('./public/login.html');
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      handler: function(req, reply) {
        accountHandler.validateLogin(req, reply);
      }
    }
  },
  {
    method: 'POST',
    path: '/logout',
    config: {
      handler: function(req, reply) {
        req.auth.session.clear();
        reply();
      }
    }
  },
  {
    method: 'POST',
    path: '/accounts',
    config: {
      auth: false,
      handler: function(req, reply) {
        accountHandler.createNewAccount(req, reply);
      }
    }
  }
]