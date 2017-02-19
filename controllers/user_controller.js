var models = require('../models');
var literals = require('../config/literals');

module.exports =  {
  //Si llegas a ejecutar esto, es que tienes todo bien!
  validateAction: function (request, reply) {
    var username = request.payload.username;
    var password = request.payload.password;
    models.User.find({
      where:{
        "username": username,
        "password": password
      }
    }).then(function(user){
      models.Token.find({
        where:{
          UserId: user.id
        },
        order: [['updatedAt', 'DESC']],
        limit:1
      }).then(function(token){
        //Tenemos el usuario y el token.
        reply({"user":{"username": user.username, "token": token.token}});
      }).catch(function(){
        //Tenemos el usuario y hay que crear el token.
        models.Token.generateToken().then(function(token){
          user.addToken(token);
          user.save().then(function(){
            reply({"user":{"username": user.username, "token": token.token}});
          });
        })
      });
    });
  },
  getUserAction: function(request,reply){
    //request.auth.credentials
    //console.log(request.auth.credentials);
    reply(request.auth.credentials);
  },
  //security simple
  createUserAction: function (request, reply) {
    console.log(request.payload.username);
    models.User.count({
      where:{
        username: request.payload.username
      }
    }).then(function (count) {
      if(count>0)
        reply(Boom.forbidden(literals.errors.user_exists));
      else
        models.User.create({
          username: request.payload.username,
          password: request.payload.password,
          name: request.payload.name,
          lname: request.payload.lname,
          email: request.payload.email
        }).then(function (user) {
          //Tenemos el usuario y hay que crear el token.
          models.Token.generateToken().then(function(token){
            user.addToken(token);
            user.save().then(function(){
              reply({"user":{"username": user.username, "token": token.token}});
            });
          });
        });
    })
  },
  //security simple
  updateUserAction: function (request, reply) {
    var user = request.auth.credentials;
    var params = request.payload;
    console.log(request.payload);

    if('name' in params){
      user.name = params.name;
    }

    if('lname' in params){
      user.name = params.lname;
    }

    user.save().then(reply);
  },
  listUsersAction: function(request, reply){
    models.User.find().then(reply);
  }
}
