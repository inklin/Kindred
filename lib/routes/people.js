module.exports = [
  {
    method: 'PUT',
    path: '/people',
    config: {
      handler: function(req, reply){
        reply('PUT request received to people/: ' + req.payload);
      },
      auth: 'session'
    }
  },
  {
    method: 'POST',
    path: '/people',
    config: {
      handler: function(req, reply) {
        reply('POST request received to people/ : ' + req.payload);
      },
      auth: 'session'
    }
  }
]