var accountHandler = require('../handlers/account.js');

module.exports = [
  {
    method: 'PUT',
    path: '/accounts',
    config: {
      handler: function(req, reply) {
        reply('Put request received by accounts/ : ' + req.payload);
      },
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/login',
    handler: function(req, reply) {
      var account = req.state.sid;
      if (account) {
        reply.redirect('/');
      } else {
        reply.file('./public/login.html');
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: function(req, reply) {
      accountHandler.validateLogin(req, reply);
    }
  },
  {
    method: 'POST',
    path: '/logout',
    config: {
      handler: function(req, reply) {
        request.auth.session.clear();
        reply();
      },
      auth: 'session'
    }
  },
  {
    method: 'POST',
    path: '/accounts',
    handler: function(req, reply) {
      accountHandler.createNewAccount(request, reply);
    }
  }
]