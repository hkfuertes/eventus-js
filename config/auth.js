//http://stackoverflow.com/questions/34886063/sequelize-synchronous-find

module.exports = {
  appToken:{
    validateFunc: function (tokens, callback) {
      //console.log(tokens);
      appToken = tokens['ApplicationToken'];

      if(appToken == "app_token")
        return callback(null, true, "Miguel");
      else
        return callback("No app registered", false,null);
    }
  }
}
