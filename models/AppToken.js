"use strict";

module.exports = function(sequelize, DataTypes) {
  var AppToken = sequelize.define("AppToken", {
    app_name: DataTypes.STRING,
    token: DataTypes.STRING,
    valid_until: DataTypes.DATE
  });

  return AppToken;
};
