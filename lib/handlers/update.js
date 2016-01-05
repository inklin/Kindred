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
  var title = req.payload.title;
  var intro = req.payload.intro;
  var body = req.payload.body;
  var imageUrl = req.payload.imageUrl;
  // var sections = req.payload.sections;
    models.Update.create({
      AccountId: currentUser.id
    }).then(function(update){
      models.Section.create({
        AccountId: currentUser.id,
        title: title,
        intro: intro,
        body: body,
        imageUrl: imageUrl,
        UpdateId: update.id
      }).then(function(section, update){
        reply({
          statusCode: 200,
          message: 'Created update & section(s)',
          data: JSON.stringify([section, update])
        });

    }, function(err) {
      reply(Boom.badRequest('Failed to create new update', err));
    });
  })
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
    where: { id: req.payload.UpdateId }
  }).then(function(update) {
    if (update) {
      update.destroy().then(function(){
        reply({
          statusCode: 200,
          message: 'Update and associated sections have been deleted'
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to delete update', err));
      });
    }
  }, function(err) {
    reply(Boom.badRequest('Failed to get update', err));
  });
}

module.exports = {
  'createNewUpdate': createNewUpdate,
  'updateTheUpdate': updateTheUpdate
}
