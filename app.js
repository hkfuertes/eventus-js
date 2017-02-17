'use strict';

const Hapi = require('hapi');
var models = require('./models');

// Create a server with a host and port
const server = new Hapi.Server();


server.connection({
    host: 'localhost',
    port: 8000
});

 var user_routes = require('./routes/user_routes').init(server);

// Start the server
models.sequelize.sync().then(function() {
    server.start(function () {
        console.log("Hapi server started @", server.info.uri);
    });
});
