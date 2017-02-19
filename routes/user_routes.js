var UserController = require("../controllers/user_controller");
var Joi = require("Joi");
var literals = require("../config/literals");

exports.init = function (server) {
  //Validates a User.
  server.route({
    method: 'POST',
    path: '/user/validate',
    config:{
      auth: 'app',
      description: 'Validates a User',
      tags: ['api', 'users'],
      validate: {
        payload: {
          username : Joi.string().required().description(literals.user.username),
          password : Joi.string().required().description(literals.user.password),
        }
      },
      handler: UserController.validateAction
    }
  });

  //Returns User.
  server.route({
    method: 'GET',
    path: '/user',
    config:{
      auth: 'full',
      description: 'Returns the authenticated User',
      tags: ['api', 'users'],
      handler: UserController.getUserAction
    }
  });

  server.route({
    method: 'PUT',
    path: '/user',
    config:{
      auth: 'full',
      description: 'Updates the authenticated User',
      tags: ['api', 'users'],
      validate: {
        payload: {
          name : Joi.string().description(literals.user.name),
          lname : Joi.string().description(literals.user.lname)
        }
      },
      handler: UserController.updateUserAction
    }
  });

  //Creates User.
  server.route({
    method: 'POST',
    path: '/user',
    config:{
      auth: 'app',
      description: 'Creates a User',
      tags: ['api', 'users'],
      validate: {
        payload: {
          username : Joi.string().required().description(literals.user.username),
          password : Joi.string().required().description(literals.user.password),
          name : Joi.string().required().description(literals.user.name),
          lname : Joi.string().required().description(literals.user.lname),
          email : Joi.string().required().description(literals.user.email)
        }
      },
      handler: UserController.createUserAction
    }
  });
  //List users
  server.route({
    method:'GET',
    path:"/user/list",
    config:{
      auth: 'app',
      description: 'Lists Users',
      tags: ['api', 'users', 'debug'],
      handler: UserController.listUsersAction
    }
  });
}
