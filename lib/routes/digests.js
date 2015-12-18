module.exports = [
  {
    method: 'GET',
    path: '/digests',
    handler: function(req, reply){
      reply('GET request received to digests/');
    }
  },
  {
    method: 'GET',
    path: '/digests/{id}',
    handler: function(req, reply) {
      reply('GET request received to digests/:id ' + req.payload);
    }
  }
]