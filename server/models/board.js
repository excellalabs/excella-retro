/* jslint node: true */
var db = require('./database');
var helpers = require('../../shared/helpers.js');

function saveBoard(boardId, board, callback) {
    "use strict";
    db.put(boardId, board, function(err) {
        if (err) {
            console.log('Create failed: ', err);
        }
        callback(err, board);
    });
}

module.exports = {
    create: function(user, boardName, scrumMasterKey, callback){
        "use strict";
        var boardId = helpers.guid();
        var board = { id: boardId, title: boardName, phase: 'initial', scrumMaster: user, scrumMasterKey: scrumMasterKey, participants: [ user ], feedback: [], themes: [] };
        saveBoard(boardId, board, callback);
    },
    get: function(boardId, callback){
        "use strict";
        db.get(boardId, function(err, board) {
            if (err) {
                console.log('Create failed: ', err);
            }

            callback(err, board);
        });
    },
    getBoardParticipants: function(boardId, callback){
        "use strict";
        this.get(boardId, function(err, board) {
            callback(err, board.participants);
        });
    },
    joinBoard: function(boardId, user, callback) {
        "use strict";
        this.get(boardId, function(err, board) {
            board.participants.push(user);
            saveBoard(boardId, board, function(err, board) {
                callback(err, board.participants);
            });
        });
    },
    addFeedback: function(boardId, feedback, callback) {
        "use strict";
        this.get(boardId, function(err, board) {
            board.feedback.push(feedback);
            saveBoard(boardId, board, function(err, board) {
                callback(err, feedback);
            });
        });
    },
    addTheme: function(boardId, theme, callback) {
        "use strict";
        this.get(boardId, function(err, board) {
            board.themes.push(theme);
            saveBoard(boardId, board, function(err, board) {
                callback(err, theme);
            });
        });
    },
    getThemes: function(boardId, callback) {
        "use strict";
        this.get(boardId, function(err, board) {
            callback(err, board.themes);
        });
    }
};