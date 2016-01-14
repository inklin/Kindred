var models = require('../../models/index.js');

var updatePersonsDigestSettings = function(req, reply) {
  var currentUserId = req.auth.credentials.id;
  var digestSchedule = parseInt(req.payload.digestSchedule);
  var digestView = req.payload.digestView;

  models.Person.findAll({
    where: {
      AccountId: currentUserId
    }
  }).then(function(person){
        var person = person[0];
        person.update({
          ReceiveOn: digestSchedule,
          ReceiveAs: digestView
        }).then(function(person){
          reply({
            statusCode: 200,
            message: 'Person updated successfully',
            person: person
          });
        }, function(err) {
        reply(Boom.badRequest('Failed to update account', err));
      })
    });
};

module.exports = {
  'updatePersonsDigestSettings': updatePersonsDigestSettings
}
