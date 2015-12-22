var db        = require('../../models/index.js');
var bcrypt    = require('bcrypt');

var validateLogin = function(request, reply){
  var username = request.payload.username;
  var password = request.payload.password;

  db.Account.findAll({
    where: {
      username: username
    }
  }).then(function(data){
    if ( data.length !== 0 ){
      var account = data[0];

      bcrypt.compare(password, account.password, function(err, res){
        if (err) {
          console.log(err);
          reply(Boom.badRequest());
        }

        if (res){ 
          request.auth.session.set({id: account.id});
          reply('You are now logged in as ' + username);
        } else {
          reply('Failure');
        }
      })
    } else {
      reply(Boom.notFound());
    }
  }, console.log)
}

var createNewAccount = function(request, reply) {
  var username = request.payload.username;
  var password = request.payload.password;

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
          }).then(function(account){
            reply(account);
            // TODO: after creating account, need to redirect user to index page
            // Set user as being signed in
          }, function(err){
            reply(err.message);
          })
        })
      })
    } else {
      reply('duplicate acc');
    }
  }, console.log)
}


module.exports = {
  'validateLogin': validateLogin,
  'createNewAccount': createNewAccount
}