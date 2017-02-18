//http://stackoverflow.com/questions/34886063/sequelize-synchronous-find

module.exports = {
  oneToken:{
      allowQueryToken: true,              // optional, true by default
      allowMultipleHeaders: false,        // optional, false by default
      accessTokenName: 'access_token',    // optional, 'access_token' by default
      validateFunc: function (token, callback) {

          // For convenience, the request object can be accessed
          // from `this` within validateFunc.
          var request = this;

          // Use a real strategy here,
          // comparing with a token from your database for example
          if (token === "1234") {
              return callback(null, true, { token: token }, { artifact1: 'an artifact' });
          }

          return callback(null, false, { token: token }, { artifact1: 'an artifact' });
      }
  },
  twoTokens:{
      allowQueryToken: true,              // optional, true by default
      allowMultipleHeaders: false,        // optional, false by default
      accessTokenName: 'access_token',    // optional, 'access_token' by default
      validateFunc: function (token, callback) {

          // For convenience, the request object can be accessed
          // from `this` within validateFunc.
          var request = this;

          // Use a real strategy here,
          // comparing with a token from your database for example
          if (token === "1234") {
              return callback(null, true, { token: token }, { artifact1: 'an artifact' });
          }

          return callback(null, false, { token: token }, { artifact1: 'an artifact' });
      }
  }
}
