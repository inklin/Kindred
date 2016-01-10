var models        = require('../../models/index.js');

var addCommentToSection = function(req, reply) {
  // Request: include content, SectionId in payload
  var currentUser = req.currentUser;

  models.Comment.create({
    content: req.payload.content,
    SectionId: req.payload.SectionId,
    AccountId: currentUser.id
  }).then(function(comment) {
    reply({
      statusCode: 200,
      message: 'Successfully created a new comment',
      data: comment
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to create comment'));
  });
}

module.exports = {
  'addCommentToSection': addCommentToSection
}
