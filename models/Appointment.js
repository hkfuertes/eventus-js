"use strict";

module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    time: DataTypes.DATE,
    title: DataTypes.STRING,
    location: DataTypes.STRING,
  },{
    classMethods: {
      associate: function(models) {
      }
    }
    ,
    instanceMethods: {
    }
  });
  return Appointment;
};
