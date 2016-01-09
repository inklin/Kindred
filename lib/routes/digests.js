var digestUpdateHandler = require('../handlers/digest-update.js');
var digestHandler = require('../handlers/digest.js');

module.exports = [
  {
    method: 'GET',
    path: '/api/digests',
    handler: function(req, reply){
      digestHandler.getAllDigests(req, reply);
    }
  },
  {
    method: 'GET',
    path: '/api/digests/{id}',
    handler: function(req, reply) {
      digestHandler.getSingleDigest(req, reply);
    }
  },
  {
    method: 'POST',
    path: '/api/digestupdates',
    handler: function(req, reply) {
      digestUpdateHandler.createNewDigestUpdate(req, reply);
    }
  }
]
