var db = require('../../models/index.js');

var createNewPerson = function(req, reply, accntId) {
  var firstName = req.payload.firstName;
  var lastName = req.payload.lastName;
  var email = req.payload.email;
  var accntId = accntId;

  db.Person.findAll({
    where: {
      email: email
    }
  }).then(function(person){
    if ( person.length === 0 ){
      db.Person.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        AccountId: accntId
      }).then(function(person){
        reply.redirect('/');
      }, function(err){
        reply(err.message);
      })
    } else {
      person[0].update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        AccountId: accntId
      }).then(function(){
        reply.redirect('/');
      }, function(err){
        reply(err.message);
      })
    }
  }, console.log);
};

module.exports = {
  'createNewPerson': createNewPerson
}
