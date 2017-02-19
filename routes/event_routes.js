var EventController = require("../controllers/event_controller");
var Joi = require("Joi");
var literals = require("../config/literals");

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
          name : Joi.string().required().description(literals.event.name),
          place : Joi.string().required().description(literals.event.place),
          start_date : Joi.date().required().description(literals.event.start_date),
          end_date : Joi.date().description(literals.event.end_date),
          type : Joi.string().required().description(literals.event.type),
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
          key : Joi.string().required().description(literals.event.key),
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
          key : Joi.string().required().description(literals.event.key),
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
          key : Joi.string().required().description(literals.event.key),
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
          key : Joi.string().required().description(literals.event.key),
          name : Joi.string().required().description(literals.event.name),
          place : Joi.string().required().description(literals.event.place),
          start_date : Joi.date().required().description(literals.event.start_date),
          end_date : Joi.date().description(literals.event.end_date),
          type : Joi.string().required().description(literals.event.type)
        }
      },
      handler: EventController.modifyEventAction
    }
  });
}
