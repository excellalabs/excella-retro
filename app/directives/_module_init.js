/* global require, module, exports */
/* jslint browser: true */

var angular = require('angular');
module.exports = angular.module('remoteRetro.directives', []);

// Define the list of directives:
require('./errorField.js');
require('./viewFeedback.js');
require('./addFeedback.js');
require('./addTheme.js');
require('./viewThemes.js');
require('./navBar.js');
require('./branding.js');
require('./connectionStatus.js');
require('./light.js');
require('./spinner.js');
require('./dragContainer.js');
require('./draggable.js');
require('./dropArea.js');
require('./folder.js');
require('./folderHolder.js');
require('./phases/actionItems.js');
require('./phases/summary.js');
require('./phases/whatNeedsImprovement.js');
require('./phases/whatWentWell.js');
require('./scrumMasterTools.js');
require('./subphases/identifyThemes.js');
