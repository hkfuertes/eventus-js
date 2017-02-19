var AppointmentController = require("../controllers/appointment_controller");
var Joi = require("Joi");
var literals = require("../config/literals");

exports.init = function (server) {
  //Validates a User.
  server.route({
    method: 'POST',
    path: '/appointment',
    config:{
      auth: 'full',
      description: 'Creates an appointment.',
      tags: ['api', 'appointment'],
      validate: {
        payload: {
          event_key : Joi.string().required().description(literals.event.key),
          time : Joi.date().required().description(literals.appointment.time),
          title : Joi.string().required().description(literals.appointment.title),
          location : Joi.string().required().description(literals.appointment.location)
        }
      },
      handler: AppointmentController.createAction
    }
  });


  server.route({
    method: 'DELETE',
    path: '/appointment',
    config:{
      auth: 'full',
      description: 'Deletes an appointment.',
      tags: ['api', 'appointment'],
      validate: {
        payload: {
          id : Joi.number().integer().required()
        }
      },
      handler: AppointmentController.deleteAction
    }
  });

}
