/* jslint node: true */
"use strict";

var board = require('../models/board');
var Hapi = require('hapi');
var io = require('../config/socketSetup').instance;
var constants = require('../../shared/constants/boardConstants');

module.exports = {
    createBoard: {
        handler: function (request, reply) {
            board.create(request.payload.user, request.payload.boardName, request.payload.scrumMasterKey, function (err, board) {
                if (err) {
                    var error = Hapi.error.badRequest(constants.messages.cannotCreate);
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
                    var error = Hapi.error.badRequest(constants.messages.cannotFind);
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
                    var error = Hapi.error.badRequest(constants.messages.cannotFind);
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
    setBoardPhase: {
        handler: function (request, reply) {
            board.setPhase(request.params.id, request.payload.phase, request.payload.scrumMasterKey, function(err, board){
                if(err){
                    var error;
                    if(err === constants.scrumMasterError) {
                        error = Hapi.error.badRequest(constants.messages.cannotUpdatePhase);
                        error.output.statusCode = 400;
                    } else {
                        error = Hapi.error.badRequest(constants.messages.cannotFind);
                        error.output.statusCode = 404;
                    }
                    reply(error);
                } else {
                    if(request.payload.phase === constants.phases.votingStarted) {
                        io.to(request.params.id).emit(constants.socketEmitters.beginVoting, board);
                    } else if(request.payload.phase === constants.phases.votingEnded) {
                        io.to(request.params.id).emit(constants.socketEmitters.collectVotes, board);
                    } else {
                        io.to(board.id).emit(constants.socketEmitters.refreshBoard, board);
                    }
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
            board.addFeedback(request.params.id, request.params.type, request.payload.feedback, function (err, feedback) {
                if (err) {
                    var error = Hapi.error.badRequest(constants.messages.cannotFind);
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
                    var error = Hapi.error.badRequest(constants.messages.cannotFind);
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
            board.addTheme(request.params.id, request.payload.theme, function (err, themes) {
                if (err) {
                    var error = Hapi.error.badRequest(constants.messages.cannotFind);
                    error.output.statusCode = 404;
                    reply(error);
                } else {
                    io.to(request.params.id).emit(constants.socketEmitters.themesEdited, themes);
                    reply(request.payload.theme);
                }
            });
        },
        app: {
            name: 'board'
        }
    },
    changeThemes: {
        handler: function (request, reply) {
            board.setThemes(request.params.id, request.payload.themes, function (err, themes) {
                if (err) {
                    var error = Hapi.error.badRequest(constants.messages.cannotFind);
                    error.output.statusCode = 404;
                    reply(error);
                } else {
                    io.to(request.params.id).emit(constants.socketEmitters.themesEdited, themes);
                    reply(request.payload.theme);
                }
            });
        },
        app: {
            name: 'board'
        }
    },
    addVotes: {
        handler: function (request, reply) {
            board.addVotes(request.params.id, request.payload.themeIdVoteCollection, function (err, themes) {
                if (err) {
                    var error = Hapi.error.badRequest(constants.messages.cannotFind);
                    error.output.statusCode = 404;
                    reply(error);
                } else {
                    io.to(request.params.id).emit(constants.socketEmitters.themeAdded, themes);
                    reply(true);
                }
            });
        },
        app: {
            name: 'board'
        }
    },
    deleteBoard: {
        handler: function(request, reply){
            board.delete(request.params.id, request.payload.scrumMasterKey, function(err){
                if(err){
                    var error;
                    if(err === constants.scrumMasterError) {
                        error = Hapi.error.badRequest(constants.messages.cannotDelete);
                        error.output.statusCode = 400;
                    } else {
                        error = Hapi.error.badRequest(constants.messages.cannotFind);
                        error.output.statusCode = 404;
                    }
                    reply(error);
                } else {
                    io.to(request.params.id).emit(constants.socketEmitters.boardClosed, request.params.id);
                    reply(true);
                }

            });
        },
        app: {
            name: 'board'
        }
    }
};