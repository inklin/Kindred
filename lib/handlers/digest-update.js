var Boom          = require('boom');
var Promise       = require('bluebird');
var models        = require('../../models/index.js');

var createNewDigestUpdate = function(req, reply) {
  var update = req.payload.update;

  models.Contact.findAll({
    where: { AccountId: update.AccountId }
  }).then(function(contacts) {

    var promises = contacts.map(function(contact) {

      return models.Digest.findOrCreate({
        where: {
          PersonId: contact.PersonId,
          sentAt: null
        }
      }).then(function(digests){

        return models.DigestUpdate.create({
          DigestId: digests[0].id,
          UpdateId: update.id
        });
      });
    });

    Promise.all(promises).then(function(digestUpdates) {
      reply({
        statusCode: 200,
        data: digestUpdates
      });
    }).catch(function(err) {
      reply({
        statusCode: 400,
        message: 'Failed to create all digest updates',
        data: err.message
      });
    });

  }, function(err) {
    reply(Boom.badRequest('Failed to get contacts for update\'s account', err));
  });
}

module.exports = {
  'createNewDigestUpdate': createNewDigestUpdate
}