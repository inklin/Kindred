var models        = require('../../models/index.js');

var addCommentToSection = function(req, reply) {
  // Request: req.params.comment --> send with hash object (key value pairs)
  // include: AccountId, Content, SectionId

  models.Contact.create(
    req.params.comment
  ).then(function(comment) {
    reply({
      statusCode: 200,
      message: 'Successfully created a new comment',
      data: JSON.stringify(comment)
    });
  }, function(err) {
    reply(Boom.badRequest('Failed to create comment'));
  });
}

var getSectionComments = function(req, reply) {
  // Request: send with req.params.SectionId

  models.Section.findAll({
    where: { id: req.params.SectionId }
  }).then(function(sections) {
    if (sections.length !== 0) {
      var section = sections[0];

      section.getComments().then(function(comments) {
        reply({
          statusCode: 200,
          message: 'Retrieved comments for section',
          data: JSON.stringify(comments)
        });
      }, function(err) {
        reply(Boom.badRequest('Failed to get section comments'));
      });
    }
  }, function(err) {
    reply(Boom.badRequest('Failed to get sections'));
  });
}