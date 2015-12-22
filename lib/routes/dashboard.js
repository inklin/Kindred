module.exports = [
  {
    method: 'GET',
    path: '/{all*}',
    config: {
      auth: 'session',
      handler: function(req, reply){
        reply.file('./public/index.html')
      }
    }
  }
]