module.exports = [
  {
    method: 'POST',
    path: '/sections',
    config: {
      handler: function(req, reply){
        reply('POST request received to sections/ :' + req.payload);
      },
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/sections',
    config: {
      handler: function(req, reply) {
        reply('GET request received by sections/');
      },
      auth: 'session'
    }
  },
  {
    method: 'DELETE',
    path: '/sections/{id}',
    config: {
      handler: function(req, reply) {
        reply('DELETE request received by sections/: ' + req.payload);
      },
      auth: 'session'
    }
  },
    {
    method: 'PUT',
    path: '/sections/{id}',
    config: {
      handler: function(req, reply) {
        reply('PUT request received by sections/: ' + req.payload);
      },
      auth: 'session'
    }
  }
]