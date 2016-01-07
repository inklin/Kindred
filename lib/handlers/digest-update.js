var Boom          = require('boom');
var models        = require('../../models/index.js');

var createNewDigestUpdate = function(update, reply) {
  // Grab AccountId from Update
  var AccountId = update.AccountId;

  // Grab all of the Recipients/People associated with that AccountId from Contacts
  models.Contact.findAll({
    where: { AccountId: AccountId }
  }).then(function(contacts) {

    // Grab each Person's DigestRecipientSettings
    contacts.forEach(function(contact) {

      var PersonId = contact.PersonId;

      models.DigestRecipientSettings.findAll({
        where: { PersonId: PersonId }
      }).then(function(settings){
        // RecieveAs: full, snippet, none
        var viewSetting = settings[0].ReceiveAs;

        models.Digest.findAll({
          where: {
            PersonId: PersonId,
            sentAt: null
          }
        }).then(function(digests) {

          if (digests.length === 0) {

            // Create a new Digest
            models.Digest.create({
              PersonId: PersonId,
              sendAs: viewSetting
            }).then(function(digest) {

              // Create a Digest_Update
              models.DigestUpdate.create({
                DigestId: digest.id,
                UpdateId: update.id
              }).then(function(digestUpdate){
                reply({
                  statusCode: 200,
                  message: 'Successfully created Digest and Digest-Update',
                  digestUpdate: digestUpdate,
                  digest: digest,
                  update: update
                });
              }, function(err) {
                reply(Boom.badRequest('Failed to create Digest Update', err));
              });

            }, function(err) {
              reply(Boom.badRequest('Failed to create Digest', err));
            });

          } else {
            var digest = digests[0];

            // Create Digest_Update
            models.DigestUpdate.create({
              UpdateId: update.id,
              DigestId: digest.id
            }).then(function(digestUpdate) {
              reply({
                statusCode: 200,
                message: 'Successfully created Digest-Update for existing Digest',
                digestUpdate: digestUpdate,
                digest: digest,
                update: update
              });
            }, function(err) {  
              reply(Boom.badRequest('Failed to create Digest Update', err));
            });
          }
        }, function(err) {
          reply(Boom.badRequest('Failed to get Digests for contact', err));
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to get person\'s settings in Digest-View-Settings', err));
      });
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get contacts from Contacts', err));
  });
}