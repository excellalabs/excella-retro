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
        cannotUpdatePhase: 'Cannot update board phase!',
        cannotUpdateFeedback: 'Cannot update board feedback!'
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
        themesEdited: 'themes-edited',
        boardClosed: 'board-closed',
        refreshBoard: 'refresh-board',
        wellFeedbackEdited: 'well-feedback-edited'
    }
};

values.workflow = [
    { phase: values.phases.wellInitial, actionText: 'Start \"What Went Well\" Feedback Gathering'},
    { phase: values.phases.wellFeedbackStarted, actionText: 'Stop \"What Went Well\" Feedback Gathering'},
    { phase: values.phases.wellFeedbackCompleted, actionText: 'End \"What Went Well\" Phase'},
    { phase: values.phases.improveInitial, actionText: 'Start \"What Needs Improvement\" Feedback Gathering'},
    { phase: values.phases.improveFeedbackStarted, actionText: 'Stop \"What Needs Improvement\" Feedback Gathering'},
    { phase: values.phases.improveFeedbackCompleted, actionText: 'End \"What Needs Improvement\" Phase'},
    { phase: values.phases.actionInitial, actionText: 'Start Voting'},
    { phase: values.phases.actionVotingStarted, actionText: 'Tally Votes'},
    { phase: values.phases.actionVotingEnded, actionText: 'End Action Items Phase'},
    { phase: values.phases.summary, actionText: 'Close Retrospective'}
];

//TODO: call readonly(values) which is currently broken
exports = module.exports = values;