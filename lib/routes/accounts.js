var accountHandler = require('../handlers/account.js');
var Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/api/account',
    handler: function(req, reply) {
      accountHandler.getCurrentUserInfo(req, reply);
    }
  },
  {
    method: 'PUT',
    path: '/api/accounts',
    handler: function(req, reply) {
      accountHandler.updateAccount(req, reply);
    }
  },
  {
    method: 'GET',
    path: '/signup',
    config: {
      auth: false,
      handler: function(req, reply) {
        reply.file('./public/signup.html');
      }
    }
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler: function(req, reply) {
        var currentUser = req.currentUser;
        if (currentUser) {
          reply.redirect('/');
        } else {
          reply.file('./public/login.html');
        }
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
    method: 'GET',
    path: '/logout',
    handler: function(req, reply) {
      req.auth.session.clear();
      reply.redirect('/login');
    }
  },
  {
    method: 'POST',
    path: '/api/accounts',
    config: {
      auth: false,
      handler: function(req, reply) {
        accountHandler.createNewAccount(req, reply);
      },
      validate: {
        payload: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          avatarUrl: Joi.string().allow(''),
          username: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          confirmation: Joi.ref('password')
        }
      }
    }
  }
]
