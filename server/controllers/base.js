// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    index: {
        handler: function(request, reply){
            reply.file('/public/index.html');
        },
        app: {
            name: 'index'
        }
    },
    missing: {
        handler: function(request, reply){
            reply('You found an invalid route, but won the 404 error!').code(404);
        },
        app: {
            name: '404'
        }
    }
}