module.exports = [
  {
    method: 'GET',
    path: '/updates',
    config: {
      handler: function(req, reply){
        reply('GET request received to updates/');
      },
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/updates/{id}',
    config: {
      handler: function(req, reply) {
        reply('GET request received to updates/:id ' + req.payload);
      },
      auth: 'session'
    }
  }
]