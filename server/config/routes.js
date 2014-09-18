/* jslint node: true */
/**
* Dependencies.
*/

var controller = require('./controllers');

// Array of routes for Hapi
// TODO: split up based on controller
module.exports = [
    // Base
    {
        method: 'GET',
        path: '/',
        config: controller.base.index
    },
    {
        method: 'GET',
        path: '/{path*}',
        config: controller.base.missing
    },
    {
        method: 'GET',
        path: '/images/{path*}',
        config: controller.assets.images
    },
    {
        method: 'GET',
        path: '/css/{path*}',
        config: controller.assets.css
    },
    {
        method: 'GET',
        path: '/fonts/{path*}',
        config: controller.assets.fonts
    },
    {
        method: 'GET',
        path: '/templates/{path*}',
        config: controller.assets.templates
    },
    {
        method: 'GET',
        path: '/js/{path*}',
        config: controller.assets.js
    },
    {
        method: 'GET',
        path: '/bower_components/{path*}',
        config: controller.assets.bower
    },
    // Board
    {
        method: 'POST',
        path: '/board',
        config: controller.board.createBoard
    },
    {
        method: 'GET',
        path: '/board/{id}',
        config: controller.board.getBoard
    },
    {
        method: 'GET',
        path: '/board/{id}/participants',
        config: controller.board.getBoardParticipants
    },
    {
        method: 'PUT',
        path: '/board/{id}/phase',
        config: controller.board.setBoardPhase
    },
    {
        method: 'POST',
        path: '/board/{id}/feedback',
        config: controller.board.addFeedback
    },
    {
        method: 'GET',
        path: '/board/{id}/theme',
        config: controller.board.getThemes
    },
    {
        method: 'POST',
        path: '/board/{id}/theme',
        config: controller.board.addTheme
    },
    {
        method: 'PUT',
        path: '/board/{id}/addVotes',
        config: controller.board.addVotes
    }
];
