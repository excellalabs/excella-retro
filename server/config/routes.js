/* jslint node: true */
/**
* Dependencies.
*/
var controller = require('./controllers');

// Array of routes for Hapi
// TODO: split up based on controller
module.exports = [
    // Admin
    {
        method: 'POST',
        path: '/feedback',
        config: controller.admin.addFeedback
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
        path: '/board/{id}/setFeedback/{type}',
        config: controller.board.setFeedback
    },
    {
        method: 'PUT',
        path: '/board/{id}/phase',
        config: controller.board.setBoardPhase
    },
    {
        method: 'POST',
        path: '/board/{id}/feedback/{type}',
        config: controller.board.addFeedback
    },
    {
        method: 'POST',
        path: '/board/{id}/editFeedback/{type}',
        config: controller.board.editFeedback
    },
    {
        method: 'DELETE',
        path: '/board/{id}/deleteFeedback/{type}/{feedbackId}',
        config: controller.board.deleteFeedback
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
    },
    {
        method: 'DELETE',
        path: '/board/{id}/{scrumMasterKey}',
        config: controller.board.deleteBoard
    }
];
