var models = require('../../models/index.js');
var Boom   = require('boom');
var Promise = require('bluebird');

var getAccountUpdates = function(req, reply) {
  // var currentUser = req.currentUser;

  // currentUser.getUpdates().then(function(updates) {
  models.Update.findById(1).then(function(updates) {
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
  var sections = req.payload.sections;

  var promises = sections.map(function(section) {
    var s = section;
    var title = s.title;
    var intro = s.intro;
    var body = s.body;
    var imageUrl = s.imageUrl;

    return models.Update.create({
      AccountId: 1
    }).then(function(update){

      return models.Section.create({
        AccountId: 1,
        title: s.title,
        intro: s.intro,
        body: s.body,
        imageUrl: s.imageUrl,
        UpdateId: update.id
      });
    })

  });

  Promise.all(promises).then(function(digestUpdates) {
    reply({
      statusCode: 200,
      message: 'Successfully created Update & Sections',
      data: digestUpdates
    });
  }).catch(function(err) {
    reply({
      statusCode: 400,
      message: 'Failed to create Update & Sections',
      data: err.message
    });
  });
}

var updateUpdateSections = function(req, reply) {
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
  'updateUpdateSections': updateUpdateSections,
  'deleteUpdate': deleteUpdate
}
