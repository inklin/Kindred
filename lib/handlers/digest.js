var models        = require('../../models/index.js');
var Boom          = require('boom');
var Promise       = require('bluebird');

var getSingleDigest = function(req, reply) {
  var digestId = req.params.id;

  models.Digest.findAll({
    where: {
      id: digestId
     },
    include: [
      { model: models.Update }
    ]
  }).then(function(digests) {

    if (digests.length !== 0) {
      var digest = digests[0];
      var updates = digest.Updates;

      var promises = updates.map(function(update){
        return update.getSections();
      });

      Promise.all(promises).then(function(result){

        var data = {
          digest: digest,
          updateSections: result
        };

        reply({
          statusCode: 200,
          message: 'Successfully retrieved digest with updates and sections',
          data: data
        });
      })
    } else {
      reply(Boom.badRequest('Digest does not exist'));
    }

  }, function(err) {
    reply(Boom.badRequest('Failed to find Digest', err));
  })
}

module.exports = {
  'getSingleDigest': getSingleDigest
}
