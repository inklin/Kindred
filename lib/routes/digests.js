var digestUpdateHandler = require('../handlers/digest-update.js');

module.exports = [
  {
    method: 'GET',
    path: '/api/digests',
    handler: function(req, reply){
      reply('GET request received to digests/');
    }
  },
  {
    method: 'GET',
    path: '/api/digests/{id}',
    handler: function(req, reply) {
      reply('GET request received to digests/:id ' + req.payload);
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
