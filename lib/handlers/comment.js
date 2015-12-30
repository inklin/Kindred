var models        = require('../../models/index.js');

var addCommentToSection = function(req, reply) {
  // Request: send with section id

  // post comment in connection with a section
  reply('POST request received to comments/: ' + req.payload);
}

var getSectionComments = function(req, reply) {
    // Request: send with section id
  reply('GET request received by comments/');
}