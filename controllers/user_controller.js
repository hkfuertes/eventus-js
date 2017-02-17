var models = require('../models');

module.exports =  {
  /*
  //Si llegas a ejecutar esto, es que tienes todo bien!
  checkUserTokenAction: function (request, reply) {
    reply({success: true});
  },
  //Security auth especial, damos token.
  obtainAccessTokenAction: function (request, reply) {
    User.checkUser(request.params.username, request.payload.password)
    .catch(function(){
      reply({success:false, error:2});
    })
    .then(function(user){
      Token.getTokenForUser(user)
      .catch(Token.create)
      .then(function(token){
        reply({
          success:true,
          user: {
            username: user.username,
            token: token.token
          }
        });

      });
    })
  },
  //Security normal, doble token
  getUserInfoAction: function (request, reply) {
    User.getUser(request.params.username)
    .catch(function () {
      reply({success: false, error: 3});
    })
    .then(function(user){
      reply({
        success: true,
        user:{
          firstname: user.name,
          lastname: user.lname,
          email: user.email
        }
      });
    });
  },
  //security simple
  createUserAction: function (request, reply) {
    User.getUser(request.payload.username)
    .then(function (user) {
      reply({success: false, error:2})
    })
    .catch(function(){
      new User({
        username: request.payload.username,
        password: request.payload.password,
        name: request.payload.firstname,
        lname: request.payload.lastname,
        email: request.payload.email
      }).save()
      .then(function (user) {
        Token.getTokenForUser(user)
        .catch(Token.create)
        .then(function(token){
          reply({
            success:true,
            user: {
              username: user.username,
              token: token.token
            }
          });

        });
      });
    })
  },
  */
  //security simple
  createTestUser: function (request, reply) {
    models.User.create({
      username: "Usuairo",
      password: "password",
      name: "usuario",
      lname: "apellido",
      email: "email@email.com"
    }).then(reply);
  }
}
