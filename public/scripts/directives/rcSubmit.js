var app = require('./_module_init.js');

app.directive('rcSubmit', ['$parse', '$q', '$timeout', function ($parse, $q, $timeout) {
        return {
            restrict: 'A',
            require: ['rcSubmit', '?form'],
            controller: ['$scope', function ($scope) {

                var formElement = null;

                var formController = null;
                var submitCompleteHandlers = [];

                this.attempted = false;
                this.submitInProgress = false;

                this.setFormElement = function(element) {
                    formElement = element;
                }

                this.submit = function() {
                    if (!formElement) return;

                    jQuery(formElement).submit();
                }

                this.setAttempted = function() {
                    this.attempted = true;
                };

                this.setFormController = function(controller) {

                    formController = controller;
                };

                this.needsAttention = function (fieldModelController) {
                    if (!formController) return false;

                    if (fieldModelController) {
                        return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
                    } else {
                        return formController && formController.$invalid && (formController.$dirty || this.attempted);
                    }
                };

                this.onSubmitComplete = function (handler) {

                    submitCompleteHandlers.push(handler);
                };

                this.setSubmitComplete = function (success, data) {

                    angular.forEach(submitCompleteHandlers, function (handler) {
                        handler({ 'success': success, 'data': data });
                    });
                };
            }],
            compile: function(cElement, cAttributes, transclude) {
                return {
                    pre: function(scope, formElement, attributes, controllers) {

                        var submitController = controllers[0];
                        var formController = (controllers.length > 1) ? controllers[1] : null;

                        submitController.setFormElement(formElement);
                        submitController.setFormController(formController);

                        scope.rc = scope.rc || {};
                        scope.rc[attributes.name] = submitController;
                    },
                    post: function(scope, formElement, attributes, controllers) {

                        var submitController = controllers[0];
                        var formController = (controllers.length > 1) ? controllers[1] : null;
                        var fn = $parse(attributes.rcSubmit);

                        formElement.bind('submit', function () {
                            submitController.setAttempted();
                            if (!scope.$$phase) scope.$apply();

                            if (!formController.$valid) return false;

                            var doSubmit = function () {

                                submitController.submitInProgress = true;
                                if (!scope.$$phase) scope.$apply();

                                var returnPromise = $q.when(fn(scope, { $event: event }));

                                returnPromise.then(function (result) {
                                    submitController.submitInProgress = false;
                                    if (!scope.$$phase) scope.$apply();
                                    $timeout(function() {
                                        submitController.setSubmitComplete(true, result);
                                    });

                                }, function (error) {
                                    submitController.submitInProgress = false;
                                    if (!scope.$$phase) scope.$apply();
                                    submitController.setSubmitComplete(false, error);
                                });
                            };

                            if (!scope.$$phase) {
                                scope.$apply(doSubmit);
                            } else {
                                doSubmit();
                                if (!scope.$$phase) scope.$apply();
                            }
                        });
                    }
                };
            }
        };
    }]
);