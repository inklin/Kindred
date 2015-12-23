module.exports = [
  {
    method: 'GET',
    path: '/digests',
    config: {
      handler: function(req, reply){
        reply('GET request received to digests/');
      },
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/digests/{id}',
    config: {
      handler: function(req, reply) {
        reply('GET request received to digests/:id ' + req.payload);
      },
      auth: 'session'
    }
  }
]