var models          = require('../../models/index.js');
var sectionHandler  = = require('../handlers/section.js');

var getAccountUpdates = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getUpdates().then(function(contacts) {
    reply({
      statusCode: 200,
      message: 'Retrieving all user updates',
      data: JSON.stringify(updates)
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get updates', err));
  });
}

var createNewUpdate = function(req, reply) {
  var currentUser = req.currentUser;
  // On SAVE or SUBMIT
    // Create Update w/ CurrentUser's ID and Draft TRUE
    models.Update.create({
      AccountId = currentUser.id,
      draft = true
    }).then(function(account){
      // TODO check for any completed Sections
        // IF Section Validations pass
          // Create each Section in the DB & associate with UpdateId
        // ELSE show errors to be corrected
      reply({
        statusCode: 200
      });

    }, function(err) {
      reply(Boom.badRequest('Failed to create new update', err));
    });
  });
};
