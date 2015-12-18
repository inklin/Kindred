module.exports = [
  {
    method: 'POST',
    path: '/contacts',
    handler: function(req, reply){
      reply('POST request received by contacts/ :' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/contacts',
    handler: function(req, reply) {
      reply('GET request received by contacts/');
    }
  },
  {
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: function(req, reply) {
      reply('DELETE request received by contacts/: ' + req.payload);
    }
  },
    {
    method: 'PUT',
    path: '/contacts/{id}',
    handler: function(req, reply) {
      reply('PUT request received by contacts/: ' + req.payload);
    }
  }
]