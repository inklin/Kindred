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
    path: '/api/updates',
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
      updateHandler.updateUpdateSections(req, reply);
    }
  },
  {
    method: 'DELETE',
    path: '/api/updates/{id}',
    handler: function(req, reply) {
      updateHandler.deleteUpdate(req, reply);
    }
  },
  {
    method: 'POST',
    path: '/api/updates/publish',
    handler: function(req, reply) {
      updateHandler.publishUpdate(req, reply);
    }
  },
  {
    method: 'POST',
    path: '/api/updates/create-draft',
    handler: function(req, reply) {
      updateHandler.createUpdateDraft(req, reply);
    }
  }
]
