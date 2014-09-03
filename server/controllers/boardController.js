/* jslint node: true */
var board = require('../models/board');
var Hapi = require('hapi');
var SocketIO = require('socket.io');

module.exports = function boardController(server){
    "use strict";
    var io = SocketIO.listen(server.listener);

    io.sockets.on('connection', function(socket){
        socket.on('room', function(room){
            if(socket.currentRoom !== undefined){
                if(socket.currentRoom === room){ return; }
                socket.leave(socket.currentRoom);
            }
            socket.join(room);
            socket.currentRoom = room;
        });
    });

    var controller = {
        createBoard: {
            handler: function (request, reply) {
                board.create(request.payload.user, request.payload.boardName, request.payload.scrumMasterKey, function (err, board) {
                    if (err) {
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
            handler: function (request, reply) {
                board.get(request.params.id, function (err, board) {
                    if (err) {
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
            handler: function (request, reply) {
                board.getBoardParticipants(request.params.id, function (err, board) {
                    if (err) {
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
            handler: function (request, reply) {
                board.joinBoard(request.params.id, request.payload.user, function (err, participants) {
                    if (err) {
                        var error = Hapi.error.badRequest('Cannot find board!');
                        error.output.statusCode = 404;
                        reply(error);
                    } else {
                        //TODO: append guid or use pools
                        io.to(request.params.id).emit('joined', participants);
                        reply(true);
                    }
                });
            },
            app: {
                name: 'board'
            }
        },
        addFeedback: {
            handler: function (request, reply) {
                board.addFeedback(request.params.id, request.payload.feedback, function (err, feedback) {
                    if (err) {
                        var error = Hapi.error.badRequest('Cannot find board!');
                        error.output.statusCode = 404;
                        reply(error);
                    } else {
                        reply(feedback);
                    }
                });
            },
            app: {
                name: 'board'
            }
        },
        getThemes: {
            handler: function (request, reply) {
                board.getThemes(request.params.id, function (err, themes) {
                    if (err) {
                        var error = Hapi.error.badRequest('Cannot find board!');
                        error.output.statusCode = 404;
                        reply(error);
                    } else {
                        reply(themes);
                    }
                });
            },
            app: {
                name: 'board'
            }
        },
        addTheme: {
            handler: function (request, reply) {
                board.addTheme(request.params.id, request.payload.theme, function (err, theme) {
                    if (err) {
                        var error = Hapi.error.badRequest('Cannot find board!');
                        error.output.statusCode = 404;
                        reply(error);
                    } else {
                        reply(theme);
                    }
                });
            },
            app: {
                name: 'board'
            }
        }
    };

    return controller;
};