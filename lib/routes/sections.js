var sectionHandler = require('../handlers/section.js');

module.exports = [
  {
    method: 'POST',
    path: '/api/sections',
    config: {
      payload: {
        maxBytes: 209715200,
        allow: 'multipart/form-data',
        output: 'stream',
        parse: true
      },
      handler: function(req, reply){
        sectionHandler.createNewSection(req, reply);
      }
    }
  },
  {
    method: 'GET',
    path: '/api/sections',
    handler: function(req, reply) {
      reply('GET request received by sections/');
    }
  },
  {
    method: 'DELETE',
    path: '/api/sections/{id}',
    handler: function(req, reply) {
      reply('DELETE request received by sections/: ' + req.payload);
    }
  },
    {
    method: 'PUT',
    path: '/api/sections/{id}',
    handler: function(req, reply) {
      reply('PUT request received by sections/: ' + req.payload);
    }
  }
]
