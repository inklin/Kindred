module.exports = [
  {
    method: 'POST',
    path: '/api/sections',
    handler: function(req, reply){
      reply('POST request received to sections/ :' + req.payload);
      // On Save or Submit Update
        // Update gets created then
        // Get UpdateId
        // Validate Section Values
          // If good
            // Create new sections's associated to update
              // top section = id1, next = id2 and so on to maintain order in DB
          // Else, prompt for corrections
    }
  },
  {
    method: 'GET',
    path: '/api/sections',
    handler: function(req, reply) {
      reply('GET request received by sections/');
      // On View Update Drafts
      // On View Single Updates
        // Return all section's from this UpdateId
      // On View Single Digests
        // Return all section's from this Digest's UpdateIds

    }
  },
  {
    method: 'DELETE',
    path: '/api/sections/{id}',
    handler: function(req, reply) {
      reply('DELETE request received by sections/: ' + req.payload);
    }
  },
    {
    method: 'PUT',
    path: '/api/sections/{id}',
    handler: function(req, reply) {
      reply('PUT request received by sections/: ' + req.payload);
      // On Save or Submit Update from Update Creation or Update Draft
    }
  }
]
