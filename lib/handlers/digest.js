var models        = require('../../models/index.js');
var Boom          = require('boom');

var getSingleDigest = function(req, reply) {
  var digestId = req.params.id;

  models.Digest.findAll({
    where: {
      id: digestId
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

    reply({
      statusCode: 200,
      message: 'Successfully retrieved digest with updates and sections',
      data: digest
    });

  }, function(err) {
    reply(Boom.badRequest('Failed to find Digest', err));
  })
}

var getAllDigests = function(req, reply) {
  models.Digest.findAll({
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
    reply(Boom.badRequest('Failed to retrieve all digests', err));
  })
}

module.exports = {
  'getSingleDigest': getSingleDigest,
  'getAllDigests': getAllDigests
}
