//http://stackoverflow.com/questions/34886063/sequelize-synchronous-find
var models = require('../models');

module.exports = {
  app:{
    validateFunc: function (tokens, callback) {
      appToken = tokens['ApplicationToken'];

      //Recuperamos el objeto de la Base de datos
      models.AppToken.find({
        where:{
          "token": appToken
        }
      }).then(function(app_token_object){
        //Si coinciden, entonces seguimos.
        console.log("[*] Application: "+app_token_object.app_name);
        return callback(null, true, app_token_object.app_name);
      }).catch(function(){
        return callback("App not found!", false,null);
      })
    }
  },
  full:{
    validateFunc: function (tokens, callback) {
      appToken = tokens['ApplicationToken'];
      token = tokens['UserToken'];

      models.AppToken.find({
        where:{
          "token": appToken
        }
      })
      .then(function(app_token_object){
        console.log("[*] Application: "+app_token_object.app_name);
        models.Token.find({
          where:{
            "token": token
          }
        })
        .then(function(token_object){
          models.User.find({
            where:{
              "id" : token_object.UserId
            }
          })
          .then(function(user){
            console.log("[*] User: "+user.username);
            return callback(null, true, user);
          })
          .catch(function(){
            return callback("User not found!", false,null);
          })
        })
        .catch(function(){
          return callback("Token not found!", false,null);
        })
      })
      .catch(function(){
        return callback("App not found!", false,null);
      })
    }
  }
}
