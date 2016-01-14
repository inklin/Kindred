var models        = require('../../models/index.js');
var personHandler = require('../handlers/person.js');
var Boom          = require('boom');

var createContact = function(req, reply) {
  // Request: firstName, lastName, email in payload
  var contactEmail = req.payload.contactEmail;
  var currentUser = req.currentUser;

  models.Person.findOrCreate({
    where: {
      email: contactEmail
    }
  }).spread(function(person, created){

    models.Contact.create({
      AccountId: currentUser.id,
      PersonId: person.id
    }).then(function(contact) {
      reply({
        statusCode: 200,
        message: 'Successfully added person as a contact for current user',
        contact: contact
      });
    }, function(err) {
      reply(Boom.badRequest('Failed to add person as a contact for current user', err));
    });

  });
}

var getAccountContacts = function(req, reply) {
  // var currentUserId = req.auth.credentials.id;
  var currentUser = req.currentUser;

  currentUser.getContacts().then(function(contacts) {
    reply({
      statusCode: 200,
      message: 'Retrieved all current user contacts',
      contacts: contacts
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get contacts', err));
  });
}

var deleteContact = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getContacts({
    where: {
      id: req.params.id
    }
  }).then(function(contacts) {
    if (contacts.length !== 0){
      var contact = contacts[0];
      contact.destroy().then(function(){
        reply({
          statusCode: 200,
          message: 'Contact has been deleted'
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to delete contact', err));
      });
    }

  }, function(err) {
    reply(Boom.badRequest('Failed to get contact', err));
  });
}

module.exports = {
  'createContact': createContact,
  'getAccountContacts': getAccountContacts,
  'deleteContact': deleteContact
}
