/* jslint node: true */
var Hapi = require('hapi');
var server = Hapi.createServer(process.env.HOST || 'localhost', parseInt(process.env.PORT, 10) || 3000);

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
require('./server/config/socketSetup')(server);
require('./server/config/plugins')(server);

require('./server/socketFeatures/boardSocket');

// Require the routes and pass the server object.
var routes = require('./server/config/routes');
// Add the server routes
server.route(routes);

//Start the server
server.start(function() {
    //Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);    
});