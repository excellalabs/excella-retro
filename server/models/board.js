/* jslint node: true */
"use strict";
var db = require('./database');
var constants = require('../../shared/constants/board');
var helpers = require('../../shared/helpers.js');
var lock = require('../../shared/lock.js');
var _ = require('lodash');

function saveBoard(boardId, board, callback) {
    db.put(boardId, board, function(err) {
        if (err) {
            console.log('Create failed: ', err);
        }
        callback(err, board);
    });
}

function removePrivateFields(board){
    // TODO: eventually, don't expose scrum master key but verify identity server-side
    ////if(board && board.scrumMasterKey !== undefined){
    ////    board.scrumMasterKey = undefined;
    ////}
}

module.exports = {
    create: function(user, boardName, scrumMasterKey, callback){
        var boardId = helpers.guid();
        var board = { id: boardId, title: helpers.toTitleCase(boardName), phase: constants.phases.initial, scrumMaster: user, scrumMasterKey: scrumMasterKey, participants: [], feedback: [], themes: [] };
        saveBoard(boardId, board, callback);
    },
    delete: function(boardId, scrumMasterKey, callback){
        db.get(boardId, function(err, board){
            if (err) {
                console.log('Lookup failed: ', err);
                callback(err);
                return;
            }
            if(board.scrumMasterKey !== scrumMasterKey){
                callback(constants.errors.scrumMasterMismatch);
                return;
            }
            db.destroy(boardId, function(err){
                callback(err);
            });
        });
    },
    isScrumMasterKeyCorrect: function(boardId, scrumMasterKey, callback){
        db.get(boardId, function(err, board) {
            if (err) {
                console.log('Lookup failed: ', err);
            }
            callback(err, board.scrumMasterKey === scrumMasterKey);
        });
    },
    setPhase: function(boardId, newPhase, scrumMasterKey, callback){
        db.get(boardId, function(err, board) {
            if (err) {
                console.log('Get failed: ', err);
                callback(err);
                return;
            }
            if(!board || board.scrumMasterKey !== scrumMasterKey){
                callback(constants.errors.scrumMasterMismatch);
                return;
            }

            board.phase = newPhase;

            saveBoard(boardId, board, function(err, savedBoard) {
                removePrivateFields(savedBoard);
                callback(err, savedBoard);
            });
        });
    },
    get: function(boardId, callback){
        db.get(boardId, function(err, board) {
            if (err) {
                console.log('Get failed: ', err);
            }
            removePrivateFields(board);
            callback(err, board);
        });
    },
    getBoardParticipants: function(boardId, callback){
        this.get(boardId, function(err, board) {
            callback(err, board.participants);
        });
    },
    joinBoard: function(boardId, user, callback) {
        this.get(boardId, function(err, board) {
            var index = board.participants.indexOf(user);
            if(index >= 0){
                callback(constants.errors.userExists, board.participants);
                return;
            }
            board.participants.push(user);
            saveBoard(boardId, board, function(err, savedBoard) {
                callback(err, savedBoard.participants);
            });
        });
    },
    leaveBoard: function(boardId, user, callback) {
        this.get(boardId, function(err, board) {
            var index = board.participants.indexOf(user);
            if(index < 0){
                callback(constants.errors.userDoesNotExist, board.participants);
                return;
            }
            board.participants.splice(index, 1);
            saveBoard(boardId, board, function(err, savedBoard) {
                callback(err, savedBoard.participants);
            });
        });
    },
    addFeedback: function(boardId, feedback, callback) {
        this.get(boardId, function(err, board) {
            board.feedback.push(feedback);
            saveBoard(boardId, board, function(err, savedBoard) {
                callback(err, feedback);
            });
        });
    },
    addTheme: function(boardId, theme, callback) {
        this.get(boardId, function(err, board) {
            var newTheme = { id: helpers.guid(), description: theme, votes: 0 };
            board.themes.push(newTheme);
            saveBoard(boardId, board, function(err, board) {
                callback(err, board.themes);
            });
        });
    },
    getThemes: function(boardId, callback) {
        this.get(boardId, function(err, board) {
            callback(err, board.themes);
        });
    },
    addVotes: function(boardId, themeIdVoteCollection, callback) {
        var that = this;

        lock(boardId, function(release) {
            that.get(boardId, function (err, board) {
                for (var themeId in themeIdVoteCollection) {
                    if (themeIdVoteCollection.hasOwnProperty(themeId)) {
                        var theme = _.findWhere(board.themes, {id: themeId});
                        theme.votes += themeIdVoteCollection[themeId];
                    }
                }

                saveBoard(boardId, board, function(err, board) {
                    callback(err, board.themes);
                    release();
                });
            });
        });
    }
};