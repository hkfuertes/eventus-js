"use strict";

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    key: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    place: DataTypes.STRING,
    date: DataTypes.DATE,
    type: DataTypes.STRING
      },{
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {as: "Admin"});
        Event.belongsToMany(models.User, {as: "Participants", through: "Participations"});
      },
      createEvent: function(name, place, date, type){
        //Returns a promise
        return this.sequelize.models.Event.create({
          "key": "EVENT_KEY", //To be automatically generated.
          "name": name,
          "place": place,
          "date": date,
          "type": type
        });
      }
    }
    ,
    instanceMethods: {
    }
  });

  return Event;
};
