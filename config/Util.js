var models = require("../models");

module.exports = {
  createTokenForUser: function(user){
    models.Token.create("token": "token3").then()
  }
}
