"use strict";

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define("Token", {
    token: DataTypes.STRING,
    valid_until: DataTypes.DATE
  },{
    classMethods: {
      //Como si fuera el constructor, devuelve una promesa.
      generateToken: function(){
        return this.sequelize.models.Token.create({token:"token2"});
      }
    }
  });

  return Token;
};
