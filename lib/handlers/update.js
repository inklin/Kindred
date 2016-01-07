var models = require('../../models/index.js');

var getAccountUpdates = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getUpdates().then(function(updates) {
    reply({
      statusCode: 200,
      message: 'Retrieved all updates of Current User',
      updates: updates
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get updates', err));
  });
}

var getSingleUpdate = function(req, reply) {
  var UpdateId = req.params.id;

  models.Update.findById(UpdateId).then(function(update){
    update.getSections().then(function(sections){
      reply({
        statusCode: 200,
        message: 'Received Update & Sections',
        update: update,
        section: sections
      });
    })
  }, function(err){
    reply(Boom.badRequest('Failed to get update', err));
  });
}

var createNewUpdate = function(req, reply) {
  var currentUser = req.currentUser;
  var returnedSections = [];

  models.Update.create({
    AccountId: currentUser.id
  }).then(function(update){
    // loop through each of the sections passed along in the request (there will at least be 1)
    for (var i in req.payload.section) {
      var section = req.payload.sections[i]

      var title = section.title;
      var intro = section.intro;
      var body = section.body;
      var imageUrl = section[i].imageUrl;
      // create a new section
      models.Section.create({
        AccountId: currentUser.id,
        title: title,
        intro: intro,
        body: body,
        imageUrl: imageUrl,
        UpdateId: update.id
      }).then(function(section){
        // store the returned section
        returnedSections.push(section);
        // then reply with update & sections
        reply({
          statusCode: 200,
          message: 'Created update & section(s)',
          update: update,
          section: returnedSections
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to create new update & sections', err));
      });
    }
  })
}

// TODO: will need to update this to update multiple sections
var updateTheUpdate = function(req, reply) {
  var title = req.payload.title;
  var intro = req.payload.intro;
  var body = req.payload.body;
  var imageUrl = req.payload.imageUrl;
  var UpdateId = req.params.id;

  models.Update.findById(UpdateId).then(function(update) {
    update.getSections().then(function(sections){
      var firstSection = sections[0];
      firstSection.update({
        title: title,
        intro: intro,
        body: body,
        imageUrl: imageUrl
      }).then(function(section){
        reply({
          statusCode: 200,
          message: 'Updated section(s)',
          update: update,
          section: section
        });

      }, function(err) {
        reply(Boom.badRequest('Failed to create new update', err));
      });
    })
  })
}

var deleteUpdate = function(req, reply) {
  var UpdateId = req.params.id;

  models.Update.findById(UpdateId).then(function(update) {
    update.destroy().then(function(){
      reply({
        statusCode: 200,
        message: 'Update and associated sections have been deleted'
      });
    }, function(err) {
      reply(Boom.badRequest('Failed to delete update', err));
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get update', err));
  });
}

module.exports = {
  'getAccountUpdates': getAccountUpdates,
  'getSingleUpdate': getSingleUpdate,
  'createNewUpdate': createNewUpdate,
  'updateTheUpdate': updateTheUpdate,
  'deleteUpdate': deleteUpdate
}
