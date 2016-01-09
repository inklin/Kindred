var bcrypt        = require('bcrypt');
var Boom          = require('boom');
var models        = require('../../models/index.js');

var getCurrentUserInfo = function(req, reply) {
  var currentUser = req.currentUser;
  reply({
    statusCode: 200,
    message: 'Successfully retrieved information for current user',
    data: currentUser
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
  var avatarUrl = req.payload.avatarUrl;
  var firstName = req.payload.firstName;
  var lastName = req.payload.lastName;
  var email = req.payload.email;

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
            password: res,
            avatarUrl: avatarUrl
          }).then(function(account){
            var AccountId = account.id;
            req.auth.session.set({ id: AccountId });

            models.Person.findAll({
              where: {
                email: email
              }
            }).then(function(people) {
              if (people.length === 0) {
                models.Person.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  AccountId: AccountId
                }).then(function(person) {
                  reply({
                    statusCode: 200,
                    message: 'Account and Person successfully created',
                    account: account,
                    person: person
                  });
                }, function(err) {
                  account.destroy().then(function() {
                    reply(Boom.badRequest('Account and person not created', err));
                  });
                });
              } else {
                var person = people[0];
                person.update({
                  firstName: firstName,
                  lastName: lastName,
                  AccountId: AccountId
                }).then(function(person){
                  reply({
                    statusCode: 200,
                    message: 'Account created and person updated',
                    account: account,
                    person: person
                  });
                }, function(err) {
                  account.destroy.then(function() {
                    reply(Boom.badRequest('Failed to update Person', err));
                  });
                });
              }
            }, function(err) {
              reply(Boom.badRequest('Failed to create Account', err));
            });
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
