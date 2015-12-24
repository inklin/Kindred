module.exports = [
  {
    method: 'PUT',
    path: '/api/people',
    handler: function(req, reply){
      reply('PUT request received to people/: ' + req.payload);
    }
  },
  {
    method: 'POST',
    path: '/api/people',
    handler: function(req, reply) {
      reply('POST request received to people/ : ' + req.payload);
    }
  }
]