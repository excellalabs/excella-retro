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
            board.setPhase(request.params.id, request.payload.phase, request.payload.scrumMasterKey, function(err, sboard){
                if(err){
                    var error;
                    if(err === constants.errors.scrumMasterMismatch) {
                        error = Hapi.error.badRequest(constants.messages.cannotUpdatePhase);
                        error.output.statusCode = 400;
                    } else {
                        error = Hapi.error.badRequest(constants.messages.cannotFind);
                        error.output.statusCode = 404;
                    }
                    reply(error);
                } else {
                    switch (request.payload.phase) {
                        case constants.phases.actionVotingStarted:
                            io.to(request.params.id).emit(constants.socketEmitters.beginVoting, sboard);
                            reply(true);
                            break;
                        case constants.phases.actionVotingEnded:
                            io.to(request.params.id).emit(constants.socketEmitters.collectVotes, sboard);

                            setTimeout(function() {
                                board.createActionItemsFromThemes(request.params.id, function(err, ssboard) {
                                    io.to(request.params.id).emit(constants.socketEmitters.refreshBoard, ssboard);
                                    reply(true);
                                });
                            }, 3000);
                            break;
                        case constants.phases.actionInitial:
                            board.createThemesFromImproveFeedback(request.params.id, function (err, ssboard) {
                                io.to(request.params.id).emit(constants.socketEmitters.refreshBoard, ssboard);
                                reply(true);
                            });
                            break;
                        default:
                            io.to(request.params.id).emit(constants.socketEmitters.refreshBoard, sboard);
                            reply(true);
                            break;
                    }
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
    setFeedback: {
        handler: function (request, reply) {
            board.setFeedback(request.params.id, request.params.type, request.payload.feedback, request.payload.scrumMasterKey, function (err, board) {
                if (err) {
                    var error;
                    if(err === constants.errors.scrumMasterMismatch) {
                        error = Hapi.error.badRequest(constants.messages.cannotUpdateFeedback);
                        error.output.statusCode = 400;
                    } else {
                        error = Hapi.error.badRequest(constants.messages.cannotFind);
                        error.output.statusCode = 404;
                    }
                    reply(error);
                } else {
                    switch(request.params.type){
                        case constants.feedbackTypes.whatWentWell:
                            io.to(request.params.id).emit(constants.socketEmitters.wellFeedbackEdited, board.wellFeedback);
                            break;
                        case constants.feedbackTypes.whatNeedsImprovement:
                            io.to(request.params.id).emit(constants.socketEmitters.improveFeedbackEdited, board.improveFeedback);
                            break;
                        case constants.feedbackTypes.actionItems:
                            io.to(request.params.id).emit(constants.socketEmitters.actionItemsEdited, board.actionItems);
                            break;
                    }
                    reply(board);
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
            board.delete(request.params.id, request.params.scrumMasterKey, function(err){
                if(err){
                    var error;
                    if(err === constants.errors.scrumMasterMismatch) {
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