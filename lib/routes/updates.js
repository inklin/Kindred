module.exports = [
  {
    method: 'GET',
    path: '/api/updates',
    handler: function(req, reply){
      reply('GET request received to updates/');
    }
  },
  {
    method: 'POST',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      reply('POST request received to updates/:id' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      reply('GET request received to updates/:id ' + req.payload);
    }
  },
    method: 'PUT',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      reply('PUT request received to updates/:id ' + req.payload);
    }
  },
    method: 'DELETE',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      reply('DELETE request received to updates/:id ' + req.payload);
    }
  }
]
