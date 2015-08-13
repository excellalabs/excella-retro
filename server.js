/* jslint node: true */
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000
});

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
require('./server/config/socketSetup')(server);
require('./server/config/plugins')(server);

require('./server/socketFeatures/boardSocket');

// Require the routes and pass the server object.
var boardRoutes = require('./server/config/routes');

var webServerRoute = [{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            redirectToSlash: true
        }
    }
}];

var routes = webServerRoute.concat(boardRoutes);

// Add the server routes
server.route(routes);

// Start the server
server.start(function() {
    // Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);    
});
