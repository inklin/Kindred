var bcrypt        = require('bcrypt');
var models        = require('../../models/index.js');
var personHandler = require('../handlers/person.js');

var getCurrentUserInfo = function(req, reply) {
  var currentUser = req.currentUser;

  models.Person.findAll({
    where: {
      AccountId: currentUser.id
    }
  }).then(function(persons) {
    if (persons.length > 0) {
      var user = persons[0];
      var info = {
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }

      reply({
        statusCode: 200,
        message: 'Retrieved current user information',
        data: info
      });

    } else {
      reply(Boom.notFound('Person not found for current user'));
    }
  }, function(err) {
      reply(Boom.badRequest('Failed to find Person for current user'));
  });
}

var validateLogin = function(req, reply) {
  var username = req.payload.username;
  var password = req.payload.password;

  models.Account.findAll({
    where: {
      username: username
    }
  }).then(function(accounts){
    if ( accounts.length !== 0 ){
      var account = accounts[0];

      bcrypt.compare(password, account.password, function(err, res){
        if (err) {
          reply(Boom.badRequest(err));
        }

        if (res){
          req.auth.session.set({ id: account.id });
          reply.redirect('/');
        } else {
          reply(Boom.badRequest('Failure to login'));
        }
      })
    } else {
      reply(Boom.notFound('No accounts found'));
    }
  }, function(err) {
    reply(Boom.badRequest('Failed to find account', err));
  });
};

var createNewAccount = function(req, reply) {
  var username = req.payload.username;
  var password = req.payload.password;

  models.Account.findAll({
    where: {
      username: username
    }
  }).then(function(accounts){
    if ( accounts.length === 0 ){
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, function(err, res){
          models.Account.create({
            username: username,
            password: res
          }).then(function(account){
            req.auth.session.set({ id: account.id });

            // TODO: Do not send password to front end
            // TODO: Create new Person with AccountID
            // TODO: Send info back and include firstName, lastName, username, email
            reply({
              statusCode: 200
            });

          }, function(err) {
            reply(Boom.badRequest('Failed to create new account', err));
          });
        });
      });
    } else {
      reply(Boom.badRequest('An account with that username already exists'));
    }
  }, function(err) {
    reply(Boom.badRequest(err));
  });
};

var updateAccount = function(req, reply) {
  var currentUser = req.currentUser;

  models.Account.update(
    // Request: send attributes to update as a hash of key-value pairs
    // { username: 'My Username', avatarUrl: 'some url here'}

    req.params.account, 
    { where: { id: currentUser.id } }
  ).then(function(data){
    reply({
      statusCode: 200,
      message: 'Account updated successfully',
      data: data
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to update account', err));
  })
};

module.exports = {
  'getCurrentUserInfo': getCurrentUserInfo,
  'validateLogin': validateLogin,
  'createNewAccount': createNewAccount,
  'updateAccount': updateAccount,
}
