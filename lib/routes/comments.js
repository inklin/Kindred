var commentHandler = require('../handlers/comment.js');

module.exports = [
  {
    method: 'POST',
    path: '/api/comments',
    handler: function(req, reply){
      commentHandler.createNewComment(req, reply);
    }
  }
]
