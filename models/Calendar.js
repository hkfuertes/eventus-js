"use strict";

module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    time: DataTypes.DATE,
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    end_date: DataTypes.DATE
  },{
    classMethods: {
      associate: function(models) {
        Appointment.belongsTo(models.Event);
      }
    }
    ,
    instanceMethods: {
    }
  });
  return Appointment;
};
