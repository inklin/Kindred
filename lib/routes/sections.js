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
        // Request: send with section id, intro, title, image upload, body
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
      // Request: send with section id, intro, title, image upload(optional), body
      sectionHandler.updateSection(req, reply);
    }
  }
]
