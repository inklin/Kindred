var models          = require('../../models/index.js');
var sectionHandler  = = require('../handlers/section.js');

var getAccountUpdates = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getUpdates().then(function(contacts) {
    reply({
      statusCode: 200,
      message: 'Retrieved all user updates',
      data: JSON.stringify(updates)
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get updates', err));
  });
}

var getSingleUpdate = function(req, reply) {
  // Request: send with req.params.UpdateId

  models.Update.findById({
    where: { id: req.params.UpdateId }
  }).then(function(update) {
    if (update) {
      update.getSections().then(function(sections) {
        reply({
          statusCode: 200,
          message: 'Retrieved sections for update',
          data: JSON.stringify(sections)
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to get update sections'));
      });
    }
  }, function(err) {
    reply(Boom.badRequest('Failed to get update'));
  });
}

var createNewUpdate = function(req, reply) {
  var currentUser = req.currentUser;
  // On SAVE or SUBMIT
    // Create Update w/ CurrentUser's ID and Draft TRUE
    models.Update.create({
      AccountId = currentUser.id,
      draft = true
    }).then(function(update){
      // TODO check for any completed Sections
        // IF Section Validations pass
          // Create each Section in the DB & associate with update.id
        // ELSE show validation errors to be corrected
      reply({
        statusCode: 200
      });

    }, function(err) {
      reply(Boom.badRequest('Failed to create new update', err));
    });
  });
};
