var Boom          = require('boom');
var models        = require('../../models/index.js');

var createNewDigestUpdate = function(req, reply) {
  var update = req.payload.update;
  var userAccountId = update.AccountId;

  models.Contact.findAll({
    where: { AccountId: userAccountId }
  }).then(function(contacts) {

    contacts.forEach(function(contact) {
      var PersonId = contact.PersonId;

      models.Digest.findOrCreate({
        where: {
          PersonId: PersonId,
          sentAt: null
        }
      }).then(function(digests) {

        var digest = digests[0];

        models.DigestUpdate.create({
          DigestId: digest.id,
          UpdateId: update.id
        }).then(function(data){
          var digestUpdate = data[0];
          digestUpdates.push(digestUpdate);

          if (digestUpdates.length === contactCount){
            reply({
              statusCode: 200,
              digestUpdates: digestUpdates
            });
          }

        }, function(err) {
          // need to handle the error if DigestUpdate is not created
        });

      }, function(err) {
        // need to handle the error if Digest is not found or created
      });

    });

  }, function(err) {
    reply(Boom.badRequest('Failed to get contacts for update\'s account', err));
  });
}

module.exports = {
  'createNewDigestUpdate': createNewDigestUpdate
}