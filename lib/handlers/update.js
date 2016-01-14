var models = require('../../models/index.js');
var Boom   = require('boom');
var Promise = require('bluebird');

var getAccountUpdates = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getUpdates({
    include: [{
      model: models.Section,
      include: [{
        model: models.Comment
      }]
    }]
  }).then(function(updates) {
    reply({
      statusCode: 200,
      message: 'Retrieved all updates of Current User',
      updates: updates
    });
  }, function(err) {
    console.log(err)
    reply(Boom.badRequest('Failed to get updates', err));
  });
}

var getSingleUpdate = function(req, reply) {
  var currentUser = req.currentUser;

  models.Update.findAll({
    where: {
      id: req.params.id,
      AccountId: currentUser.id
    },
    include: [{
      model: models.Section,
      include: [{
        model: models.Comment
      }]
    }]
  }).then(function(updates){

    var update = updates[0];

    if (update) {
      reply({
        statusCode: 200,
        message: 'Retrieved Update & Sections',
        data: update
      });
    } else {
      reply({
        statusCode: 400,
        message: 'Failed to retrieve Update & Sections'
      });
    }

  }, function(err){
    reply(Boom.badRequest('Failed to get update', err));
  });
}

// When we load the editor we'll automatically create a new update.
// Creating and updating sections will happen in the sections handler.
var createNewUpdate = function(req, reply) {
  models.Update.create({
    AccountId: currentUser.id
  }).then(function(update) {
    reply({
      statusCode: 200,
      message: 'Successfully created a new update',
      data: update
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to create update'));
  });
}

// We can potentially still use this when someone finishes editing a new update and hits 'NEXT'
var updateUpdateSections = function(req, reply) {
  var sections = req.payload.sections;

  var promises = sections.map(function(section) {
    var s = section;
    var title = s.title;
    var intro = s.intro;
    var body = s.body;
    var imageUrl = s.imageUrl;
    var sectionId = s.id;

    return models.Section.findById(sectionId).then(function(section){

      return section.update({
        title: s.title,
        intro: s.intro,
        body: s.body,
        imageUrl: s.imageUrl
      });
    })

  });

  Promise.all(promises).then(function(results) {
    reply({
      statusCode: 200,
      message: 'Successfully updated Sections',
      data: results
    });
  }).catch(function(err) {
    reply({
      statusCode: 400,
      message: 'Failed to update Sections',
      data: err.message
    });
  });
}

var deleteUpdate = function(req, reply) {
  var update = req.payload.update;

  models.Update.findById(update.id).then(function(update) {
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

var publishUpdate = function(req, reply) {
  var currentUser = req.currentUser;
  var updateId = req.payload.updateId;

  models.Update.findById(updateId).then(function(update) {
    update.update({
      draft: false,
      publishedAt: new Date()
    }).then(function(update){
      reply({
        statusCode: 200,
        message: 'Saved update draft to false and set publishedAt to current date time',
        data: update
      });
    })
  });
}

var createUpdateDraft = function(req, reply) {
  var currentUser = req.currentUser;

  models.Update.findOrCreate({
    where: {
      draft: true,
      AccountId: currentUser.id
    }
  }).then(function(update){
    models.Section.create({
      UpdateId: update.id,
      AccountId: currentUser.id,
      title: "",
      intro: "",
      body: "",
      imageUrl: "http://www.wallpapereast.com/static/images/abstract_wallpaper_1080p_by_supersaejang-d7ajj1p.png"
    }).then(function(section){
      reply({
        statusCode: 200,
        message: "New update created in draft mode with one section attached",
        update: update,
        section: section
      })
    });
  })
}

module.exports = {
  'getAccountUpdates': getAccountUpdates,
  'getSingleUpdate': getSingleUpdate,
  'createNewUpdate': createNewUpdate,
  'updateUpdateSections': updateUpdateSections,
  'deleteUpdate': deleteUpdate,
  'publishUpdate': publishUpdate,
  'createUpdateDraft': createUpdateDraft
}
