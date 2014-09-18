/* jslint node: true */
var path = require('path');

var basePath = ".";

console.log('App dir: ' + basePath);

// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    images: {
        handler: {
            directory: { path: path.join(basePath, '/public/images') }
        },
        app: {
            name: 'images'
        }
    },
    css: {
        handler: {
            directory: { path: path.join(basePath, '/public/css') }
        },
        app: {
            name: 'css'
        }
    },
    fonts: {
        handler: {
            directory: { path: path.join(basePath, '/public/fonts') }
        },
        app: {
            name: 'fonts'
        }
    },
    templates: {
        handler: {
            directory: { path: path.join(basePath, '/public/templates') }
        },
        app: {
            name: 'templates'
        }
    },
    js: {
        handler: {
            directory: { path: path.join(basePath, '/public/js') }
        },
        app: {
            name: 'js'
        }
    },
    bower: {
        handler: {
            directory: { path: path.join(basePath, '/public/bower_components') }
        },
        app: {
            name: 'bower'
        }
    }
};