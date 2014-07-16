// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    images: {
        handler: {
            directory: { path: './public/images' }
        },
        app: {
            name: 'images'
        }
    },
    css: {
        handler: {
            directory: { path: './public/css' }
        },
        app: {
            name: 'css'
        }
    },
    templates: {
        handler: {
            directory: { path: './public/templates' }
        },
        app: {
            name: 'templates'
        }
    },
    js: {
        handler: {
            directory: { path: './public/js' }
        },
        app: {
            name: 'js'
        }
    },
    bower: {
        handler: {
            directory: { path: './public/bower_components' }
        },
        app: {
            name: 'bower'
        }
    }
}