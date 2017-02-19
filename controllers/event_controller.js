var models = require('../models');
var Boom = require('boom');

module.exports =  {
  createEventAction: function (request, reply) {
    var user = request.auth.credentials;

    var name = request.payload.name;
    var place = request.payload.place;
    var date = request.payload.date;
    var type = request.payload.type;

    models.Event.createEvent(name, place, date, type)
    .then(function(event){
      user.addEvent(event);
      user.save().then(function(){});
      event.setAdmin(user);
      event.save().then(function(){});
      reply(event);
    });
  },
  getEventAction: function (request, reply) {
    var user = request.auth.credentials;
    var key = request.params.key;

    models.Event.find({
      where:{
        "key": key
      }
    }).then(function(event){
      event.getParticipants().then(function(participants){
        reply({"event": event, "Participants": participants});
      });
    });

  },
  getAdminEventsAction: function (request, reply) {
    var user = request.auth.credentials;
    models.Event.findAll({
      where:{
        "AdminId": user.id
      }
    }).then(reply);
  },
  getEventsAction: function (request, reply) {
    var user = request.auth.credentials;
    user.getEvents().then(reply);
  },
  joinEventAction: function (request, reply) {
    var user = request.auth.credentials;
    var key = request.params.key;
    models.Event.find({
      where:{
        "key": key
      }
    }).then(function(event){
      user.addEvent(event);
      user.save().then(function(user){
        reply({"user": user, "event": event});
      });
    })
  },
  unjoinEventAction: function (request, reply) {
    var user = request.auth.credentials;
    var key = request.params.key;
    models.Event.find({
      where:{
        "key": key
      }
    }).then(function(event){
      user.removeEvent(event);
      user.save().then(function(user){
        reply({"user": user, "event": event});
      });
    })
  },
  modifyEventAction: function (request, reply) {
    var user = request.auth.credentials;
    var key = request.payload.key;
    models.Event.find({
      where:{
        "key": key,
        "AdminId": user.id
      }
    }).then(function(event){
      if('name' in request.payload){
        event.name = request.payload.name;
      }
      if('place' in request.payload){
        event.place = request.payload.place;
      }
      if('date' in request.payload){
        event.date = request.payload.date;
      }
      if('type' in request.payload){
        event.type = request.payload.type;
      }

      event.save().then(reply);
    })
    .catch(function(){
      reply(Boom.unauthorized("You are not the Admin of the Event!"))
    });
  },
}
