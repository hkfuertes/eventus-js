'use strict';

const Hapi = require('hapi');
const auths = require('./config/auth');
var models = require('./models');
var pkg = require('./package.json');




// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

const options = {
    info: {
            'title': 'Eventus 2 API Documentation',
            'version': pkg.version,
        }
    };

var swagger = {
  register: require('hapi-swagger'),
  options: options
};

server.register([require('hapi-auth-token'),require('inert'), require('vision'),swagger], (err) => {

    //Register the auths types
    server.auth.strategy('app', 'header-access-tokens', auths.app);
    server.auth.strategy('full', 'header-access-tokens', auths.full);


    var user_routes = require('./routes/user_routes').init(server);
    var event_routes = require('./routes/event_routes').init(server);
    var appointment_routes = require('./routes/appointment_routes').init(server);


   // Start the server
   models.sequelize.sync().then(function() {
       server.start(function () {
           console.log("Hapi server started @", server.info.uri);
       });
   });
});
