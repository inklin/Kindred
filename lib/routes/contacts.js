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
      var currentUser = req.currentUser;
      currentUser.getContacts().then(function(contacts) {
        console.log(contacts);
      }, console.log);
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