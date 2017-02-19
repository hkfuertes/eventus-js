var EventController = require("../controllers/event_controller");
var Joi = require("Joi");

exports.init = function (server) {
  server.route({
    method: 'POST',
    path: '/event',
    config:{
      auth: 'full',
      description: 'Creates an Event and associates it to the authorized user, as administrator and participant.',
      tags: ['api', 'events'],
      validate: {
        payload: {
          name : Joi.string().required().description('Name of the event.'),
          place : Joi.string().required().description('Place of the event.'),
          date : Joi.date().required().description('Date of the event.'),
          type : Joi.string().required().description('Type of the event.'),
        }
      },
      handler: EventController.createEventAction
    }
  });

  server.route({
    method: 'GET',
    path: '/event/{key}',
    config:{
      auth: 'full',
      description: 'Gets an event by his key.',
      tags: ['api', 'events'],
      validate: {
        params: {
          key : Joi.string().required().description('Key of the event.'),
        }
      },
      handler: EventController.getEventAction
    }
  });

  server.route({
    method: 'GET',
    path: '/event/list/admin',
    config:{
      auth: 'full',
      description: 'Gets the events for where the authenticated user is admin.',
      tags: ['api', 'events'],
      validate: {
        params: {}
      },
      handler: EventController.getAdminEventsAction
    }
  });

  server.route({
    method: 'GET',
    path: '/event/list',
    config:{
      auth: 'full',
      description: 'Gets the events for where the authenticated user is participant.',
      tags: ['api', 'events'],
      validate: {
        params: {}
      },
      handler: EventController.getEventsAction
    }
  });

  server.route({
    method: 'PUT',
    path: '/event/join/{key}',
    config:{
      auth: 'full',
      description: 'Joins the authenticated user to the event.',
      tags: ['api', 'events'],
      validate: {
        params: {
          key : Joi.string().required().description('Key of the event.'),
        }
      },
      handler: EventController.joinEventAction
    }
  });

  server.route({
    method: 'DELETE',
    path: '/event/join/{key}',
    config:{
      auth: 'full',
      description: 'Unjoins the authenticated user to the event.',
      tags: ['api', 'events'],
      validate: {
        params: {
          key : Joi.string().required().description('Key of the event.'),
        }
      },
      handler: EventController.unjoinEventAction
    }
  });

  server.route({
    method: 'PUT',
    path: '/event',
    config:{
      auth: 'full',
      description: 'Modifies the information of an Event if the authenticated user is the admin.',
      tags: ['api', 'events'],
      validate: {
        payload: {
          key : Joi.string().required().description('Key of the event.'),
          name : Joi.string().description('Name of the event.'),
          place : Joi.string().description('Place of the event.'),
          date : Joi.date().description('Date of the event.'),
          type : Joi.string().description('Type of the event.')
        }
      },
      handler: EventController.modifyEventAction
    }
  });
  /*
  //List users
  server.route({
    method:'GET',
    path:"/users",
    config:{
      auth: 'app',
      description: 'Lists Users',
      tags: ['api', 'users', 'debug'],
      handler: UserController.listUsersAction
    }
  });
  */
}
