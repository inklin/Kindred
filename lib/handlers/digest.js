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

module.exports = {
  'getSingleDigest': getSingleDigest
}
