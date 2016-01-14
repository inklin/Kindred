var contactHandler = require('../handlers/contact.js');

module.exports = [
  {
    method: 'POST',
    path: '/api/contacts',
    handler: function(req, reply){
      contactHandler.createContact(req, reply);
    }
  },
  {
    method: 'GET',
    path: '/api/contacts',
    handler: function(req, reply) {
      contactHandler.getAccountContacts(req, reply);
    }
  },
  {
    method: 'DELETE',
    path: '/api/contacts/{id}',
    handler: function(req, reply) {
      contactHandler.deleteContact(req, reply);
    }
  },
    {
    method: 'PUT',
    path: '/api/contacts/{id}',
    handler: function(req, reply) {
      contactHandler.updateContact(req, reply);
    }
  }
]
