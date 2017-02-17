"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING
  },{
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Task)
      }
    }
    ,
    instanceMethods: {
      getToken: function(){
        //return token
      },
      createToken: function(){
        //Create and return token.
      }

    }
  });

  return User;
};