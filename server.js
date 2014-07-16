var Hapi = require('hapi');
var server = Hapi.createServer('localhost', process.env.PORT || 3000);

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
require('./server/config/plugins')(server);

// Require the routes and pass the server object.
var routes = require('./server/config/routes')(server);
// Add the server routes
server.route(routes);

//Start the server
server.start(function() {
    //Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);    
});

server.start();