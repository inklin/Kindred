var updateHandler = require('../handlers/update.js');

module.exports = [
  {
    method: 'GET',
    path: '/api/updates',
    handler: function(req, reply){
      updateHandler.getAccountUpdates(req, reply);
    }
  },
  {
    method: 'POST',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      updateHandler.createNewUpdate(req, reply);
    }
  },
  {
    method: 'GET',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      updateHandler.getSingleUpdate(req, reply);
    }
  },
  {
    method: 'PUT',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      reply('PUT request received to updates/:id ' + req.payload);
      // On SUBMIT
        // Update Update's DRAFT to FALSE
        // Find Contacts where Update AccountId = Contact AccountId/Sender
          // If NONE, prompt user to add at least one contact
        // Find Digests where Digest PersonId = Contact PersonId/Recipient
          // IF returned Digests > 0, find Contact's Digest where sentAt Date > now || null
            // IF returned Digest === 1, associate this UpdateId to this DigestId via Digest_Update
          // ELSE, create a new Digest
            // associate this UpdateId to this DigestId via Digest_Update
            // Check if Digest's recipient/person has an AccountId
              // IF true, find the "Receive Digest" date/time (need to create this) from Digest_View_Setting where AccountId = Digest's Recipient's AccountId
              // And set Digest's sentAt date to this date/time
                // (will need to update Receive Digest date after a Digest has been sent)
              // Else, set Digest's sentAt date to default date/time (Monday @ 5am)
    }
  },
    method: 'DELETE',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      reply('DELETE request received to updates/:id ' + req.payload);
    }
  }
]
