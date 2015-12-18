module.exports = [
  {
    method: 'POST',
    path: '/sections',
    handler: function(req, reply){
      reply('POST request received to sections/ :' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/sections',
    handler: function(req, reply) {
      reply('GET request received by sections/');
    }
  },
  {
    method: 'DELETE',
    path: '/sections/{id}',
    handler: function(req, reply) {
      reply('DELETE request received by sections/: ' + req.payload);
    }
  },
    {
    method: 'PUT',
    path: '/sections/{id}',
    handler: function(req, reply) {
      reply('PUT request received by sections/: ' + req.payload);
    }
  }
]