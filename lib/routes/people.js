module.exports = [
  {
    method: 'PUT',
    path: '/api/people',
    handler: function(req, reply){
      reply('PUT request received to people/: ' + req.payload);
      // It seems that we'll only update people when they have an account, in which case I think, for sake of consistency, it makes sense to have an updatePerson function that exists within the PUT for accounts - similarly to what we're doing with CreateNewAccount + CreateNewPerson
    }
  }
]
