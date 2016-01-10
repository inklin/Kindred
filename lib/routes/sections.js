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
    method: 'DELETE',
    path: '/api/sections/{id}',
    handler: function(req, reply) {
      sectionHandler.deleteSection(req, reply);
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
