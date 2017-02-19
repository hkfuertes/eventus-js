var models = require('../models');
var Boom = require('boom');
var literals = require('../config/literals');

module.exports =  {
  createAction: function (request, reply) {
    var user = request.auth.credentials;

    models.Event.find({
      where:{
        "key": request.payload.event_key
      }
    }).then(function(event){
      models.Appointment.create({
        time: request.payload.time,
        title: request.payload.title,
        location: request.payload.location
      }).then(function(appointment){
        event.addAppointment(appointment);
        event.save().then(function(event){
          reply({"event": event, "appointment": appointment});
        });
      })
    }).catch(function(){
      reply(Boom.notFound(literasl.event.errors.not_found));
    })
  },
  deleteAction: function (request, reply) {
    var user = request.auth.credentials;

    models.Appointment.destroy({
      where:{
        "id": request.payload.id
      }
    }).then(function(){
      reply({success: true});
    }).catch(function(){
      reply(Boom.notFound(literasl.appointment.errors.not_found));
    })
  }
}
