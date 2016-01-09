var models        = require('../../models/index.js');
var Boom          = require('boom');

var getSingleDigest = function(req, reply) {
  var currentUser = req.currentUser;
  var digestId = req.params.id;

  models.Digest.findAll({
    where: {
      id: digestId,
      PersonId: currentUser.Person.id,
      sentAt: { $ne: null}
     },
    include: [
      { model: models.Update,
        include: [ {
          model: models.Section
        }]
      }
    ]
  }).then(function(digests) {
    var digest = digests[0];
    if (digest) {
      reply({
        statusCode: 200,
        message: 'Successfully retrieved digest with updates and sections',
        data: digest
      });
    } else {
      reply({
        statusCode: 400,
        message: 'Failed to retrieve digest with updates and sections.'
      });
    }

  }, function(err) {
    reply(Boom.badRequest('Failed to find Digest', err));
  });
}

var getAllDigests = function(req, reply) {
  var currentUser = req.currentUser;

  models.Digest.findAll({
    where: {
      PersonId: currentUser.Person.id,
      sentAt: { $ne: null }
     },
    include: [
      { model: models.Update,
        include: [ {
          model: models.Section
        }]
      }
    ]
  }).then(function(digests) {

    reply({
      statusCode: 200,
      message: 'Successfully retrieved all digests with updates and sections',
      data: digests
    });

  }, function(err) {
    reply(Boom.badRequest('Failed to find Digest', err));
  });
}

module.exports = {
  'getSingleDigest': getSingleDigest,
  'getAllDigests': getAllDigests
}
