var models        = require('../../models/index.js');
var personHandler = require('../handlers/person.js');

var createContact = function(req, reply) {
  // Request: firstName, lastName, email in payload
  var email = req.payload.email;
  var firstName = req.payload.firstName;
  var lastName = req.payload.lastName;
  var currentUser = req.currentUser;

  models.Person.findOrCreate({
    where: {
      email: email
    },
    defaults: {
      firstName: firstName,
      lastName: lastName
    }
  }).spread(function(person, created){

    models.Contact.create({
      AccountId: currentUser.id,
      PersonId: person.id
    }).then(function(contact) {
      reply({
        statusCode: 200,
        message: 'Successfully added person as a contact for current user',
        data: contact
      });
    }, function(err) {
      reply(Boom.badRequest('Failed to add person as a contact for current user', err));
    });

  });
}

var getAccountContacts = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getContacts().then(function(contacts) {
    reply({
      statusCode: 200,
      message: 'Retrieved all current user\' contacts',
      data: contacts
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

var updateContact = function(req, reply) {
  // TODO: Is this needed?
  // If users are editing their contacts, it will most
  // likely be firstName, lastName, email. This information
  // is under Persons.
  reply('PUT request recieved by /api/contacts/{id} with ' + req.payload);
}

module.exports = {
  'createContact': createContact,
  'getAccountContacts': getAccountContacts,
  'updateContact': updateContact,
  'deleteContact': deleteContact
}
