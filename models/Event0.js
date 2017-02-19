"use strict";

var SequelizeTokenify = require('sequelize-tokenify');

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    key: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    place: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    type: DataTypes.STRING
      },{
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {as: "Admin"});
        Event.belongsToMany(models.User, {as: "Participants", through: "Participations"});
      }
    }
    ,
    instanceMethods: {
    }
  });

  SequelizeTokenify.tokenify(Event, {
        field: 'key',
        length: 64
    });

  return Event;
};
