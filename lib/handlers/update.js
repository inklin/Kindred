var models = require('../../models/index.js');

var getAccountUpdates = function(req, reply) {
  var currentUser = req.currentUser;

  currentUser.getUpdates().then(function(updates) {
    reply({
      statusCode: 200,
      message: 'Retrieved all updates of Current User',
      data: updates
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to get updates', err));
  });
}

var getSingleUpdate = function(req, reply) {
  models.Update.findById(req.params.id).then(function(update){
    update.getSections().then(function(sections){
      reply({
          statusCode: 200,
          message: 'Received update & sections',
          data: sections
      });
    });
  }, function(err){
    reply(Boom.badRequest('Failed to get update', err));
  })
}

var createNewUpdate = function(req, reply) {
  var currentUser = req.currentUser;
  var title = req.payload.title;
  var intro = req.payload.intro;
  var body = req.payload.body;
  var imageUrl = req.payload.imageUrl;

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
      }).then(function(section){
        reply({
          statusCode: 200,
          message: 'Created update & section(s)',
          section: section,
          update: update
        });

    }, function(err) {
      reply(Boom.badRequest('Failed to create new update', err));
    });
  })
}

var updateTheUpdate = function(req, reply) {
  var title = req.payload.title;
  var intro = req.payload.intro;
  var body = req.payload.body;
  var imageUrl = req.payload.imageUrl;
  var UpdateId = req.params.id;

  models.Section.findById({
    where: { UpdateId: UpdateId }
  }).then(function(section) {
    section.update({
      title: title,
      intro: intro,
      body: body,
      imageUrl: imageUrl
    }).then(function(section){
      reply({
        statusCode: 200,
        message: 'Updated section',
        data: JSON.stringify(section)
      });

    }, function(err) {
      reply(Boom.badRequest('Failed to create new update', err));
    });
  })
}

var deleteUpdate = function(req, reply) {
  models.Update.findById(req.params.id).then(function(update) {
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
  'getAccountUpdates': getAccountUpdates,
  'getSingleUpdate': getSingleUpdate,
  'createNewUpdate': createNewUpdate,
  'updateTheUpdate': updateTheUpdate,
  'deleteUpdate': deleteUpdate
}
