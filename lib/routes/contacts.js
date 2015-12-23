var db        = require('../../models/index.js');

module.exports = [
  {
    method: 'POST',
    path: '/contacts',
    config: {
      handler: function(req, reply){
        reply('POST request received by contacts/ :' + req.payload);
      },
      auth: 'session'
    }
  },
  {
    method: 'GET',
    path: '/contacts',
    config: {
      handler: function(req, reply) {
        // How to get the current user
        console.log('Current User account: ', req.auth.credentials.account);
        console.log('User: ', req.state.sid);
        var user = db.Account.findAll({ id: req.state.sid.id });
        console.log(user);
      },
      auth: 'session'
    }
  },
  {
    method: 'DELETE',
    path: '/contacts/{id}',
    config: {
      handler: function(req, reply) {
        reply('DELETE request received by contacts/: ' + req.payload);
      },
      auth: 'session'
    }
  },
    {
    method: 'PUT',
    path: '/contacts/{id}',
    config: {
      handler: function(req, reply) {
        reply('PUT request received by contacts/: ' + req.payload);
      },
      auth: 'session'
    }
  }
]