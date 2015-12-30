var models        = require('../../models/index.js');
var bcrypt        = require('bcrypt');
var personHandler = require('../handlers/person.js');

var validateLogin = function(req, reply){
  var username = req.payload.username;
  var password = req.payload.password;

  models.Account.findAll({
    where: {
      username: username
    }
  }).then(function(data){
    if ( data.length !== 0 ){
      var account = data[0];

      bcrypt.compare(password, account.password, function(err, res){
        if (err) {
          reply(Boom.badRequest());
        }

        if (res){
          req.auth.session.set({ id: account.id });
          reply.redirect('/');
        } else {
          reply({
            message: 'Failure'
          });
        }
      })
    } else {
      reply(Boom.notFound());
    }
  }, function(err) {
    reply({
      statusCode: 400,
      data: err
    });
  });
};

var createNewAccount = function(req, reply) {
  var username = req.payload.username;
  var password = req.payload.password;

  models.Account.findAll({
    where: {
      username: username
    }
  }).then(function(data){
    if ( data.length === 0 ){
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, function(err, res){
          models.Account.create({
            username: username,
            password: res
          }).then(function(account){
            req.auth.session.set({ id: account.id });
            personHandler.createNewPerson(req, reply, account.id);
            reply({
              statusCode: 200,
              message: 'Account created successfully',
              data: account
            })
          }, function(err){
            reply({
              statusCode: 400,
              message: 'Account not created',
              data: err
            });
          });
        });
      });
    } else {
      reply({
        message: 'An account with that username already exists'
      });
    }
  }, function(err) {
    reply({
      statusCode: 400,
      data: err
    });
  });
};

var updateAccount = function(req, reply) {
  var currentUser = req.currentUser;

  models.Account.update(
    req.params.account, 
    { where: { id: currentUser.id } }
  ).then(function(data){
    reply({
      statusCode: 200,
      message: 'Account updated successfully',
      data: data
    });
  }, function(err) {
    reply({
      statusCode: 400,
      message: 'Update failed',
      data: err
    })
  })
};

module.exports = {
  'validateLogin': validateLogin,
  'createNewAccount': createNewAccount,
  'updateAccount': updateAccount
}
