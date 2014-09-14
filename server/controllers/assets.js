/* jslint node: true */
var path = require('path');

var basePath = process.env.APP_DIR || ".";

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