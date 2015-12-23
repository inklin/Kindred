module.exports = [
  {
    method: 'POST',
    path: '/comments',
    config: {
      handler: function(req, reply){
      reply('POST request received to comments/: ' + req.payload);
      },
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/comments',
    config: {
      handler: function(req, reply) {
        reply('GET request received by comments/');
      },
      auth: 'session'
    }
  }
]