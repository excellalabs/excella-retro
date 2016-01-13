/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('ModalInstanceController', function ($scope, $modalInstance, title, body, hasCancel, $rootScope, feedbackList) {

    $scope.title = title;
    $scope.body = body;
    $scope.hasCancel = hasCancel;
    $scope.feedbackList = feedbackList;
    $scope.hideBody = false;

    $scope.ok = function () {
        $modalInstance.close("OK");
    };

    $scope.cancel = function () {
        $modalInstance.dismiss("Cancel");
    };

    if($scope.feedbackList) {
        $scope.hideBody = true;

    }

    $rootScope.$on('appendToBody', function(event, data) {
        if(data) {
            $scope.feedbackList.push(data);
        }
    });
});

module.exports = app;