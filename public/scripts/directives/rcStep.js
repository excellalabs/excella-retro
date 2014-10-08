var app = require('./_module_init.js');

app.directive('rcStep', function () {
    'use strict';
        return {
            restrict: 'A',
            require: ['^rcWizard', '?form', '?rcSubmit'],
            link: function (scope, element, attributes, controllers) {

                var wizardController = controllers[0];

                // find all the optional controllers for the step
                var formController = controllers.length > 1 ? controllers[1] : null;
                var submitController = controllers.length > 2 ? controllers[2] : null;

                // add the step to the wizard controller
                var step = wizardController.addStep({
                    'element': element,
                    'attributes': attributes,
                    'formController': formController,
                    'submitController': submitController });
            }
        };
    });