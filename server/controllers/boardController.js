var board = require('../models/board');
var Hapi = require('hapi');

module.exports = {
    createBoard: {
        handler: function(request, reply){
            board.create(request.payload.user, request.payload.boardName, request.payload.scrumMasterKey, function(err, board) {
                if(err) {
                    var error = Hapi.error.badRequest('Cannot create board!');
                    error.output.statusCode = 400;
                    reply(error);
                } else {
                    reply(board);
                }
            });
        },
        app: {
            name: 'board'
        }
    },
    getBoard: {
        handler: function(request, reply){
            board.get(request.params.id, function(err, board) {
                if(err) {
                    var error = Hapi.error.badRequest('Cannot find board!');
                    error.output.statusCode = 404;
                    reply(error);
                } else {
                    reply(board);
                }
            });
        },
        app: {
            name: 'board'
        }
    },
    getBoardParticipants: {
        handler: function(request, reply){
            board.getBoardParticipants(request.params.id, function(err, board) {
                if(err) {
                    var error = Hapi.error.badRequest('Cannot find board!');
                    error.output.statusCode = 404;
                    reply(error);
                } else {
                    reply(board);
                }
            });
        },
        app: {
            name: 'board'
        }
    },
    joinBoard: {
        handler: function(request, reply){
            board.joinBoard(request.params.id, request.payload.user, function(err, board) {
                if(err) {
                    var error = Hapi.error.badRequest('Cannot find board!');
                    error.output.statusCode = 404;
                    reply(error);
                } else {
                    reply(board);
                }
            });
        },
        app: {
            name: 'board'
        }
    }
};