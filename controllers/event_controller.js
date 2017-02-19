var models = require('../models');
var Boom = require('boom');
var literals = require('../config/literals');

module.exports =  {
  createEventAction: function (request, reply) {
    var user = request.auth.credentials;

    var name = request.payload.name;
    var place = request.payload.place;
    var start_date = request.payload.start_date;
    var type = request.payload.type;
    var end_date = request.payload.end_date;

    models.Event.create({
      "name": name,
      "place": place,
      "start_date": start_date,
      "end_date": end_date,
      "type": type
    }).then(function(event){
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
    }).catch(function(){
      reply(Boom.notFound(literals.event.errors.not_found));
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
    }).catch(function(){
      reply(Boom.notFound(literals.event.errors.not_found));
    });
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
    }).catch(function(){
      reply(Boom.notFound(literals.event.errors.not_found));
    });
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
      if('start_date' in request.payload){
        event.start_date = request.payload.start_date;
      }

      if('end_date' in request.payload){
        event.end_date = request.payload.end_date;
      }

      if('type' in request.payload){
        event.type = request.payload.type;
      }

      event.save().then(reply);
    })
    .catch(function(err){
      reply(Boom.notFound(literals.event.errors.not_found_admin));
    });
  },
}
