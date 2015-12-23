module.exports = [
  {
    method: 'GET',
    path: '/{all*}',
    handler: function(req, reply){
      reply.file('./public/index.html')
    }
  
  }
]