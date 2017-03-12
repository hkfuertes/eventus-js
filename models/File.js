"use strict";

var SequelizeTokenify = require('sequelize-tokenify');

module.exports = function(sequelize, DataTypes) {
  var File = sequelize.define("File", {
    key: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    original_filename: DataTypes.STRING,
    saved_filename: DataTypes.STRING,
    type: DataTypes.INTEGER
  },{
    classMethods: {
      associate: function(models) {
        File.belongsTo(models.User, {as: "owner"});
        File.belongsTo(models.Event);
      }
    }
    ,
    instanceMethods: {
    }
  });

  SequelizeTokenify.tokenify(File, {
    field: 'key',
    length: 64
  });

  return File;
};
