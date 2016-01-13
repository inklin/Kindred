var personHandler = require('../handlers/person.js');

module.exports = [
  {
    method: 'PUT',
    path: '/api/people',
    handler: function(req, reply){
      personHandler.updatePersonsDigestSettings(req, reply);
    }
  }
]
