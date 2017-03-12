var models = require('../models');
var literals = require('../config/literals');

module.exports =  {
  getPicturesForEvent: function (request, reply) {
    var user = request.auth.credentials;
    var key = request.params.key;

    models.Event.find({
      where:{
        "key": key
      }
    }).then(function(event){

      models.File.find({
        where:{
          "event_key": key
        }
      }).then(reply);

    }).catch(function(){
      reply(Boom.notFound(literals.event.errors.not_found));
    });

  },
  savePicturesForEvent: function (request, reply) {
    var user = request.auth.credentials;
    var key = request.params.key;

    models.Event.find({
      where:{
        "key": key
      }
    }).then(function(event){

      models.File.find({
        where:{
          "event_key": key
        }
      }).then(reply);

    }).catch(function(){
      reply(Boom.notFound(literals.event.errors.not_found));
    });

  }
}
