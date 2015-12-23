module.exports = [
  {
    method: 'POST',
    path: '/comments',
    handler: function(req, reply){
    reply('POST request received to comments/: ' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/comments',
    handler: function(req, reply) {
      reply('GET request received by comments/');
    }
  }
]