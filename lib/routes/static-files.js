module.exports = [

  {
    method: 'GET',
    path: '/js/application.js',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/js/application.js')
      }
    }
  },
  {
    method: 'GET',
    path: '/js/material.js',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/js/material.js')
      }
    }
  },
  {
    method: 'GET',
    path: '/css/styles.css',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/css/styles.css')
      }
    }
  },
  {
    method: 'GET',
    path: '/css/material.css',
    config: {
      auth: false,
      handler: function(req, reply){
        reply.file('./public/css/material.css')
      }
    }
  },
  {
    method: 'GET',
    path: '/favicon.ico',
    config: {
      auth: false,
      handler: function(req, reply){
        reply()
      }
  }
  },
  {
    method: 'GET',
    path: '/{all*}',
    handler: function(req, reply){
      reply.file('./public/index.html')
    }
  },
  {
    method: 'GET',
    path: '/section-form',
    handler: function(req, reply) {
      reply.file('./public/section-form.html');
    }
  }
]
