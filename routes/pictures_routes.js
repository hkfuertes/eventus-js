var PicturesController = require("../controllers/pictures_controller");
var Joi = require("Joi");
var literals = require("../config/literals");

exports.init = function (server) {
  server.route({
    method: 'GET',
    path: '/pictures/event/{key}',
    config:{
      auth: 'full',
      description: 'Gets pictures for an event by his event_key.',
      tags: ['api', 'events'],
      validate: {
        params: {
          key : Joi.string().required().description(literals.event.key),
        }
      },
      handler: PicturesController.getPicturesForEvent
    }
  });
}
