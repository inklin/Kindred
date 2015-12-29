var models        = require('../../models/index.js');
var personHandler = require('../handlers/person.js');

var createContact = function(req, reply) {
  // look for person with specified email
  // if person exists, add person as a contact
  // account id, person id
  // if person does not yet exist, create person
  // then add a new contact row
  // account id, new person id
  reply('POST request received by contacts/ :' + req.payload);
}

var getAccountContacts = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getContacts().then(function(contacts) {
    reply({
      statusCode: 200,
      data: JSON.stringify(contacts)
    });
  }, function(err) {
    reply({
      statusCode: 400,
      message: "Failed to get contacts"
    });
  });
}

var deleteContact = function(req, reply) {
  // req.params.id
  reply('DELETE request received by contacts/: ' + req.payload);
}

var updateContact = function(req, reply) {
  // req.params.id
  reply('PUT request received by contacts/: ' + req.payload);
}