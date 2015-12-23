module.exports = [
  {
    method: 'GET',
    path: '/api/updates',
    handler: function(req, reply){
      reply('GET request received to updates/');
    }
  },
  {
    method: 'GET',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      reply('GET request received to updates/:id ' + req.payload);
    }
  }
]