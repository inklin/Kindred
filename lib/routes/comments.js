module.exports = [
  {
    method: 'POST',
    path: '/api/comments',
    handler: function(req, reply){
      reply('POST request received to comments/: ' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/api/comments',
    handler: function(req, reply) {
      reply('GET request received by comments/');
    }
  }
]