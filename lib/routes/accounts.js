module.exports = [
  {
    method: 'POST',
    path: '/accounts',
    handler: function(req, reply){
      reply('Post request received by accounts/: ' + req.payload);
    }
  },
  {
    method: 'PUT',
    path: '/accounts',
    handler: function(req, reply) {
      reply('Put request received by accounts/ : ' + req.payload);
    }
  }
]
