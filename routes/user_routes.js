var UserController = require("../controllers/user_controller");

exports.init = function (server) {
  /*
    //Checks Pair user Token.
    server.route({
        method: 'POST',
        path: '/{apptoken}/user/token/check/{username}',
        handler: UserController.checkUserTokenAction
    })

    //Obtain access Token: Send variables via payload.
    server.route({
        method: 'POST',
        path: '/{apptoken}/user/validate/{username}',
        handler: UserController.obtainAccessTokenAction
    });

    //Gets user Info
    server.route({
        method: 'POST',
        path: '/{apptoken}/user/info/{username}',
        handler: UserController.getUserInfoAction
    });

    //Creates a user and returns the token
    server.route({
        method: 'POST',
        path: '/{apptoken}/user/create',
        handler: UserController.createUserAction
    });
*/
    //Creates a user and returns the token
    server.route({
        method: 'GET',
        path: '/user/create_test',
        config:{
          auth: 'apptoken',
          handler: UserController.createTestUser
        }
    });

    //List users
    server.route({
      method:'GET',
      path:"/users",
      config:{
        auth: "apptoken",
        handler: UserController.listUsersAction
      }
    })
}
