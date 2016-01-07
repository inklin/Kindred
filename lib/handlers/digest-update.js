var Boom          = require('boom');
var models        = require('../../models/index.js');

var createNewDigestUpdate = function(update, reply) {
  var userAccountId = update.AccountId;

  // Grab all of the Recipients/People associated with the user
  models.Contact.findAll({
    where: { AccountId: userAccountId }
  }).then(function(contacts) {

    // Grab each Person's DigestRecipientSettings
    contacts.forEach(function(contact) {

      var PersonId = contact.PersonId;

      models.Digest.findOrCreate({
        where: {
          PersonId: PersonId,
          sentAt: null
        }
      }).then(function(digest) {

        // Create a Digest_Update
        models.DigestUpdate.create({
          DigestId: digest.id,
          UpdateId: update.id
        }).then(function(digestUpdate){

          reply({
            statusCode: 200,
            message: 'Successfully got all contacts\'s Digests and created Digest-Updates for each',
            digestUpdate: digestUpdate,
            digest: digest,
            update: update
          });

        }, function(err) {
          reply(Boom.badRequest('Failed to create Digest Update', err));
        });

      }, function(err) {
        reply(Boom.badRequest('Failed to find or create Digest', err));
      });

    }

  }, function(err) {
    reply(Boom.badRequest('Failed to get contacts for update\'s account', err));
  });
}