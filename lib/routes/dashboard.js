module.exports = [
  {
    method: 'GET',
    path: '/{all*}',
    config: {
      auth: 'session',
      handler: function(request, reply){
        reply.file('./public/index.html')
      }
    }
  }
]