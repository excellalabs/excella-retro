/* jslint node: true */
"use strict";
var db = require('./database');
var helpers = require('../../shared/helpers.js');

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
        var board = { id: boardId, title: boardName, phase: 'initial', scrumMaster: user, scrumMasterKey: scrumMasterKey, participants: [ user ], feedback: [], themes: [] };
        saveBoard(boardId, board, callback);
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
                callback("scrum master key mismatch");
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
            board.participants.push(user);
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
            board.themes.push(theme);
            saveBoard(boardId, board, function(err, board) {
                callback(err, theme);
            });
        });
    },
    getThemes: function(boardId, callback) {
        this.get(boardId, function(err, board) {
            callback(err, board.themes);
        });
    }
};