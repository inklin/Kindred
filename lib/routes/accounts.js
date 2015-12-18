var validateLogin = function(request, reply){
  var username = request.payload.username
  var password = request.payload.password

  db.Account.findAll({
    where: {
      username: username
    }
  }).then(function(data){
    if ( data.length !== 0 ){
      var account = data[0]

      bcrypt.compare(password, account.password, function(err, res){
        if (err) {
          console.log(err)
          reply(Boom.badRequest())
        }

        if (res){ 
          request.auth.session.set({id: account.id})
          reply('You are now logged in as ' + username)
        } else {
          reply('Failure')
        }
      })
    } else {
      reply(Boom.notFound())
    }
  }, console.log)
}

module.exports = [
  {
    method: 'PUT',
    path: '/accounts',
    handler: function(req, reply) {
      reply('Put request received by accounts/ : ' + req.payload);
    }
  },
  {
    method: 'GET',
    path: '/login',
    handler: function(request, reply){
      reply.file('./public/login.html')
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      handler: function(request, reply){
        validateLogin(request, reply);
      }  
    }
  },
  {
    method: 'POST',
    path: '/logout',
    config: {
      handler: function(request, reply){
        request.auth.session.clear()
        reply()
      }
    }
  },
  {
    method: 'POST',
    path: '/accounts',
    config: {
      handler: function(request, reply){
        var username = request.payload.username
        var password = request.payload.password

        db.Account.findAll({
          where: {
            username: username
          }
        }).then(function(data){
          if ( data.length === 0 ){
            bcrypt.genSalt(10, function(err, salt){
              bcrypt.hash(password, salt, function(err, res){
                db.Account.create({
                  username: username,
                  password: res
                }).then(function(data){
                  reply(data)
                }, function(err){
                  reply(err.message)
                })
              })
            })
            
          } else {
            reply('duplicate acc')
          }
        }, reply)
      }  
    }
  }
]