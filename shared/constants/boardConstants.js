/* jslint node: true */
'use strict';

var readonly = require('./readonly.js');

var values = {
    errors: {
        scrumMasterMismatch: 'scrum master key mismatch',
        userExists: "User is already on board",
        userDoesNotExist: "User isn't on board"
    },

    messages: {
        cannotCreate: 'Cannot create board!',
        cannotFind: 'Cannot find board!',
        cannotDelete: 'Cannot delete board!',
        cannotUpdatePhase: 'Cannot update board phase!'
    },

    phases: {
        initial: 'well-initial',
        feedbackStarted: 'well-feedback-started',
        feedbackCompleted: 'well-feedback-completed',
        votingStarted: 'action-voting-started',
        votingEnded: 'action-voting-ended',
        /* new phases */
        wellInitial: 'well-initial',
        wellFeedbackStarted: 'well-feedback-started',
        wellFeedbackCompleted: 'well-feedback-completed',
        improveInitial: 'improve-initial',
        improveFeedbackStarted: 'improve-feedback-started',
        improveFeedbackCompleted: 'improve-feedback-completed',
        actionInitial: 'action-initial',
        actionVotingStarted: 'action-voting-started',
        actionVotingEnded: 'action-voting-ended',
        summary: 'summary'
    },

    socketEmitters: {
        joinBoard: 'room',
        joinSuccess: 'join-success',
        joinError: 'join-error',
        joined: 'joined',
        beginVoting: 'begin-voting',
        collectVotes: 'collect-votes',
        themeAdded: 'theme-added',
        boardClosed: 'board-closed',
        refreshBoard: 'refresh-board'
    }
};

exports = module.exports = readonly(values);