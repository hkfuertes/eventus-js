"use strict";

var SequelizeTokenify = require('sequelize-tokenify');

module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define("Token", {
    token: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    valid_until: DataTypes.DATE
  },{
    classMethods: {
      //Como si fuera el constructor, devuelve una promesa.
      generateToken: function(){
        return this.sequelize.models.Token.create();
      }
    }
  });

  SequelizeTokenify.tokenify(Token, {
        field: 'token',
        length: 64
    });


  return Token;
};
