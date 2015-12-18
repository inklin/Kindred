module.exports = [
  {
    method: 'GET',
    path: '/updates',
    handler: function(req, reply){
      reply('GET request received to updates/');
    }
  },
  {
    method: 'GET',
    path: '/updates/{id}',
    handler: function(req, reply) {
      reply('GET request received to updates/:id ' + req.payload);
    }
  }
]