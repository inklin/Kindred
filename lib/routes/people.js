module.exports = [
  {
    method: 'PUT',
    path: '/api/people',
    handler: function(req, reply){
      reply('PUT request received to people/: ' + req.payload);
    }
  }
]
