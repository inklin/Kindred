var db        = require('../../models/index.js');

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
      // How to get the current user
      console.log('Current User account: ', req.auth.credentials.account);
      console.log('User: ', req.state.sid);
      var user = db.Account.findAll({ id: req.state.sid.id });
      console.log(user);
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