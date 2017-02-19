var UserController = require("../controllers/user_controller");
var Joi = require("Joi");

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
          username : Joi.string().required().description('Username of the user to be validated.'),
          password : Joi.string().required().description('Password of the user to be validated.'),
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
          name : Joi.string().description('Name to be updated.'),
          lname : Joi.string().description('Lastname to be updated.'),
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
          username : Joi.string().required().description('Username for the new User.'),
          password : Joi.string().required().description('Password for the new User.'),
          name : Joi.string().required().description('Name for the new User.'),
          lname : Joi.string().required().description('Lastname for the new User.'),
          email : Joi.string().required().description('eMail for the new User.')
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
