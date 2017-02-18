'use strict';

const Hapi = require('hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const auths = require('./config/auth');
var models = require('./models');




// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

server.register(AuthBearer, (err) => {

    //Register the auths types
    server.auth.strategy('simple', 'bearer-access-token', auths.oneToken);

    var user_routes = require('./routes/user_routes').init(server);

   // Start the server
   models.sequelize.sync().then(function() {
       server.start(function () {
           console.log("Hapi server started @", server.info.uri);
       });
   });
});
