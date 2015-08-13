/* global require, module, exports */
/* jslint browser: true */

var app = require('./_module_init.js');

app.controller('ModalInstanceController', function ($scope, $modalInstance, title, body, hasCancel) {

    $scope.title = title;
    $scope.body = body;
    $scope.hasCancel = hasCancel;

    $scope.ok = function () {
        $modalInstance.close("OK");
    };

    $scope.cancel = function () {
        $modalInstance.dismiss("Cancel");
    };
});

module.exports = app;