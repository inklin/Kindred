var models          = require('../../models/index.js');

var getAccountUpdates = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getUpdates().then(function(updates) {
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
        reply(Boom.badRequest('Failed to get update sections', err));
      });
    }
  }, function(err) {
    reply(Boom.badRequest('Failed to get update', err));
  });
}

var createNewUpdate = function(req, reply) {
  var currentUser = req.currentUser;
  // On SAVE or SUBMIT
    // Create Update w/ CurrentUser's ID and Draft TRUE
    models.Update.create({
      AccountId: currentUser.id,
      draft: true // update Update Model to have true as default
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
}

var updateTheUpdate = function(req, reply) {
  // Request: send section attributes as array of section hashes
  // Validate Section values
  // IF Section Validations Pass
    // loop through the array - section.update each section
  // ELSE show validation errors to be corrected
}

var deleteUpdate = function(req, reply) {
  // Request: send with req.params.UpdateId

  models.Update.findById({
    where: { id: req.params.UpdateId }
  }).then(function(update) {
    if (update) {
      update.getSections().then(function(sections) {
        // Destroy update's sections
        for (var i = 0; i < sections.length; i++) {
          models.Section.destroy({
            where: { id: sections[i].id }
          })
        }
        // TODO update.destroy() -- how & where???
        reply({
          statusCode: 200,
          message: 'Update and sections have been deleted'
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to get update sections', err));
      });
    }
  }, function(err) {
    reply(Boom.badRequest('Failed to get update', err));
  });
}
