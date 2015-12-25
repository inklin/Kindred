module.exports = [
  {
    method: 'POST',
    path: '/api/contacts',
    handler: function(req, reply){
      reply('POST request received by contacts/ :' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/api/contacts',
    handler: function(req, reply) {
      var currentUser = req.currentUser;
      currentUser.getContacts().then(function(contacts) {
        reply({
          statusCode: 200,
          data: JSON.stringify(contacts)
        });
      }, function(err) {
        var error = {
          message: "Could not get contacts"
        },
        reply({
          statusCode: 400,
          data: error
        })

      });
    }
  },
  {
    method: 'DELETE',
    path: '/api/contacts/{id}',
    handler: function(req, reply) {
      req.params.id
      reply('DELETE request received by contacts/: ' + req.payload);
    }
  },
    {
    method: 'PUT',
    path: '/api/contacts/{id}',
    handler: function(req, reply) {
      req.params.id
      reply('PUT request received by contacts/: ' + req.payload);
    }
  }
]