var models        = require('../../models/index.js');
var personHandler = require('../handlers/person.js');

var createContact = function(req, reply) {
  // Request: have person as a hash of key value pairs
  // include: firstName, lastName, email as keys
  var email = req.params.person['email'];
  var currentUser = req.currentUser;

  models.Person.findAll({
    where: { email: email }
  }).then(function(persons) {
    if (persons.length !== 0) {
      var person = persons[0];

      models.Contact.create({
        AccountId: currentUser.id,
        PersonId: person.id
      }).then(function(contact) {
        reply({
          statusCode: 200,
          message: 'Existing person successfully added as contact',
          data: JSON.stringify(contact)
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to add xisting person as contact', err));
      });
    } else {
      models.Person.create(
        // hash key-value pairs
        // include: firstName, lastName, email
        req.params.person
      ).then(function(person) {
        models.Contact.create({
          AccountId: currentUser.id,
          PersonId: person.id
        }).then(function(contact) {
          reply({
            statusCode: 200,
            message: 'New person created and successfully added as contact',
            data: JSON.stringify(contact)
          });
        }, function(err) {
          reply(Boom.badRequest('Failed to add new person as contact', err));
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to create new person', err));
      });
    }
  });
}

var getAccountContacts = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getContacts().then(function(contacts) {
    reply({
      statusCode: 200,
      message: 'Retrieving all user contacts',
      data: JSON.stringify(contacts)
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get contacts', err));
  });
}

var deleteContact = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getContacts({
    where: { id: req.params.id }
  }).then(function(contacts) {
    if (contacts.length !== 0){
      var contact = contacts[0];
      contact.destroy().then(function(){
        reply({
          statusCode: 200,
          message: 'Contact has been deleted'
        });
      }, function() {
        reply(Boom.badRequest('Failed to delete contact'));
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