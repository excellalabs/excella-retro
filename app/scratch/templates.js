(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/boardContainer.html",
    "<nav-bar board-name=board.title user=user socket-status=socketStatus participants=participants is-scrum-master=isScrumMaster></nav-bar><alert type=info>{{boardPhaseDisplayName()}}</alert><alert type=warning ng-if=\"socketStatus == 'reconnecting'\">Lost connection to the server. Trying to reconnect.</alert><alert type=danger ng-if=\"socketStatus == 'failed' || socketStatus == 'disconnected'\">Lost connection to the server. Click on <a type=button class=\"btn btn-sm\" ng-click=refresh()><span class=\"glyphicon glyphicon-refresh\"></span></a> to re-connect</alert><div class=row-fluid><div class=\"col-md-9 no-padding\" id=board><add-feedback class=row-fluid ng-if=\"board.phase == 'well-feedback-started'\" board-id=board.id></add-feedback><div class=row-fluid ng-if=\"board.phase == 'well-feedback-completed' || board.phase.indexOf('voting') >= 0\"><div class=\"col-md-6 no-padding\"><view-feedback class=row-fluid feedback=board.feedback feedback-context=Team></div><div class=\"col-md-6 no-padding\"><view-themes class=row-fluid board-id=board.id themes=themes></view-themes></div></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/close.html",
    "<nav-bar></nav-bar><div class=row-fluid><div class=jumbotron><h1>Thank you!</h1><p>You've just completed a retrospective using Excella Retro. We're continually improving this app and would love to receive your feedback/endorsement on Twitter.</p><p id=twitter><a href=https://twitter.com/share class=twitter-share-button data-url=https://retro.excella.com data-text=\"I just completed an Agile SCRUM retrospective using Excella Retro. It's completely free. Try it now!\" data-via=excellaco data-size=large>Tweet</a></p></div></div><div class=\"row-fluid text-center\"><h2><a href=\"/#/\">Start or join a retrospective</a></h2></div><branding></branding>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/home.html",
    "<nav-bar></nav-bar><div class=row-fluid><div class=\"jumbotron col-md-6 col-md-offset-3\"><h2>Welcome to Excella Retro!</h2><h3>A real-time retrospective and collaboration tool for SCRUM teams.</h3><p>This is an <a href=https://github.com/excellalabs/excella-retro>open source project</a> proudly hosted by <a href=http://excella.com>Excella Consulting.</a></p><p><a class=\"btn btn-primary btn-lg\" href=http://excellalabs.com role=button>Learn more</a></p></div></div><div class=row-fluid><div class=col-md-6><div class=page-header><h3>Create a New Retro</h3></div><form name=createForm role=form ng-submit=createBoard()><error-field model=validation></error-field><div class=form-group><label for=scrumMasterName>Facilitator Name</label><input class=form-control id=scrumMasterName placeholder=\"Enter your name\" ng-model=user name=user required><p ng-show=createForm.user.$error.required>Name is required.</p></div><div class=form-group><label for=boardName>Retrospective Name</label><input class=form-control id=boardName placeholder=\"e.g. Project Phoenix - Sprint 6\" ng-model=boardName name=boardName required><p ng-show=createForm.boardName.$error.required>Retro Name is required.</p></div><button type=submit class=\"btn btn-primary\" value=\"Create new board\" ng-disabled=createForm.$invalid>Start a new retrospective</button></form></div><div class=col-md-6><div class=page-header><h3>Join Existing Retro</h3></div><form name=joinForm role=form ng-submit=joinBoard()><error-field model=validation></error-field><div class=form-group><label for=userName>Name</label><input class=form-control id=userName placeholder=\"Enter your name\" ng-model=user name=user required><p ng-show=joinForm.user.$error.required>Name is required.</p></div><div class=form-group><label for=boardId>Retro ID</label><input class=form-control id=boardId placeholder=\"Enter 8 character code\" ng-model=boardId name=boardId ng-minlength=8 ng-maxlength=8 required><p ng-show=joinForm.boardId.$error.required>Retro ID is required.</p><p ng-show=\"joinForm.boardId.$error.minlength || joinForm.boardId.$error.maxlength\">ID must be 8 characters long.</p></div><button type=submit class=\"btn btn-primary\" value=\"Join board\" ng-disabled=joinForm.$invalid>Join retrospective</button></form></div></div><div class=row-fluid style=\"background: white\"><div class=\"col-md-4 col-md-offset-4\"><div class=row-fluid><img src=images/excella_jsa.jpg class=\"img-responsive center-block excella-logo\" style=\"margin-top: 54px\"></div><div class=\"row-fluid text-center\"><a class=terms href=#/tos target=_blank>Terms</a></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/join.html",
    "<nav-bar></nav-bar><div class=row-fluid><div class=\"col-md-offset-3 col-md-6 col-md-offset-3\"><form name=joinForm role=form ng-submit=joinBoard()><error-field model=validation></error-field><div class=form-group><label for=userName>Name</label><input class=form-control id=userName placeholder=\"Enter your name\" ng-model=user required name=user><p ng-show=joinForm.user.$error.required>Name is required.</p></div><button type=submit class=\"btn btn-primary\" value=\"Join board\" ng-disabled=joinForm.$invalid>Join retrospective</button></form></div></div><branding></branding>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/joinAsScrumMaster.html",
    "<nav-bar></nav-bar><div>Verifying credentials...</div><branding></branding>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/modal.html",
    "<div class=modal-header><h3 class=modal-title>{{title}}</h3></div><div class=modal-body><div ng-if=\"hideBody === false\">{{body}}</div><div ng-if=\"hideBody === true\"><ol reversed><li ng-repeat=\"feedback in feedbackList.slice().reverse()\" style=\"font-size: 24px\">{{feedback.feedback[0]}}</li></ol></div></div><div class=modal-footer><button class=\"btn btn-primary\" ng-click=ok()>OK</button> <button class=\"btn btn-warning\" ng-click=cancel() ng-if=hasCancel>Cancel</button></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/retroWizard.html",
    "<nav-bar board-name=board.title user=user socket-status=socketStatus participants=participants is-scrum-master=isScrumMaster></nav-bar><scrum-master-tools ng-if=isScrumMaster board=board board-stats=boardStats></scrum-master-tools><what-went-well ng-if=\"board.phase.indexOf('well') == 0\" board=board></what-went-well><what-needs-improvement ng-if=\"board.phase.indexOf('improve') == 0\" board=board></what-needs-improvement><action-items ng-if=\"board.phase.indexOf('action') == 0\" board=board></action-items><summary ng-if=\"board.phase.indexOf('summary') == 0\" board=board></summary>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/tos.html",
    "<p><strong>Terms of Service for Retrospective Review</strong></p><p>If you require any more information or have any questions about our Terms of Service, please feel free to contact us by email at <a name=contactlink></a> info@excella.com.</p><p><strong>Introduction</strong></p><p>These terms and conditions govern your use of this website (\"Retrospective Review\"), which is owned and operated by Excella Consulting, Inc. (\"Excella\"); by using this website, you accept these terms and conditions in full and without reservation. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.</p><p>You must be at least 18 [eighteen] years of age to use this website. By using this website and by agreeing to these terms and conditions, you warrant and represent that you are at least 18 years of age.</p><p><strong>License to use website</strong></p><p>Unless otherwise stated, Excella and/or its licensors own the intellectual property rights published on this website and materials used on Retrospective Review. Subject to the license below, all these intellectual property rights are reserved.</p><p>You may view, download for caching purposes only, and print pages, files or other content from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.</p><p>You must not:</p><ul><li>republish material from this website in neither print nor digital media or documents (including republication on another website);</li><li>sell, rent or sub-license material from the website;</li><li>show any material from the website in public;</li><li>reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose;</li><li>edit or otherwise modify any material on the website;</li><li>redistribute material from this website - except for content specifically and expressly made available for redistribution; or</li><li>republish or reproduce any part of this website through the use of iframes or screenscrapers.</li><p>Where content is specifically made available for redistribution, it may only be redistributed within your organization.</p></ul><p><strong>Acceptable use</strong></p><p>You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of Retrospective Review or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.</p><p>You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.</p><p>You must not conduct any systematic or automated data collection activities on or in relation to this website without Excella's express written consent.<br>This includes:</p><ul><li>scraping</li><li>data mining</li><li>data extraction</li><li>data harvesting</li><li>'framing' (iframes)</li><li>Article 'Spinning'</li></ul><p>You must not use this website or any part of it to transmit or send unsolicited commercial communications.</p><p>You must not use this website for any purposes related to marketing without the express written consent of Excella.</p><p><strong>Restricted access</strong></p><p>Access to certain areas of this website is restricted. Excella reserves the right to restrict access to certain areas of this website, or at our discretion, this entire website. Excella may change or modify this policy without notice.</p><p>If Excella provides you with a user ID and password to enable you to access restricted areas of this website or other content or services, you must ensure that the user ID and password are kept confidential. You alone are responsible for your password and user ID security.</p><p>Retrospective Review may disable your user ID and password at Retrospective Review's sole discretion without notice or explanation.</p><p><strong>User content</strong></p><p>In these terms and conditions, \"your user content\" means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this website, for whatever purpose.</p><p>You grant to Excella a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to Excella the right to sub-license these rights, and the right to bring an action for infringement of these rights.</p><p>Your user content must not be illegal or unlawful, must not infringe any third party's legal rights, and must not be capable of giving rise to legal action whether against you or Excella or a third party (in each case under any applicable law).</p><p>You must not submit any user content to the website that is or has ever been the subject of any threatened or actual legal proceedings or other similar complaint.</p><p>Excella reserves the right to edit or remove any material submitted to this website, or stored on the servers of Retrospective Review, or hosted or published upon this website.</p><p>Excella's rights under these terms and conditions in relation to user content, Excella does not undertake to monitor the submission of such content to, or the publication of such content on, this website.</p><p><strong>No warranties</strong></p><p>This website is provided \"as is\" without any representations or warranties, express or implied. Excella makes no representations or warranties in relation to this website or the information and materials provided on this website.</p><p>Without prejudice to the generality of the foregoing paragraph, Excella does not warrant that:</p><ul><li>this website will be constantly available, or available at all; or</li><li>the information on this website is complete, true, accurate or non-misleading.</li></ul><p>Nothing on this website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any legal, financial or medical matter you should consult an appropriate professional.</p><p><strong>Limitations of liability</strong></p><p>Excella will not be liable to you (whether under the law of contact, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:</p><ul><li>to the extent that the website is provided free-of-charge, for any direct loss;</li><li>for any indirect, special or consequential loss; or</li><li>for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li></ul><p>These limitations of liability apply even if Excella has been expressly advised of the potential loss.</p><p><strong>Exceptions</strong></p><p>Nothing in this website disclaimer will exclude or limit any warranty implied by law that it would be unlawful to exclude or limit; and nothing in this website disclaimer will exclude or limit the liability of Excella in respect of any:</p><ul><li>death or personal injury caused by the negligence of Excella or its agents, employees or shareholders/owners;</li><li>fraud or fraudulent misrepresentation on the part of Excella; or</li><li>matter which it would be illegal or unlawful for Excella to exclude or limit, or to attempt or purport to exclude or limit, its liability.</li></ul><p><strong>Reasonableness</strong></p><p>By using this website, you agree that the exclusions and limitations of liability set out in this website disclaimer are reasonable.</p><p>If you do not think they are reasonable, you must not use this website.</p><p><strong>Other parties</strong></p><p>You accept that, as a limited liability entity, Excella has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against Excella's officers or employees in respect of any losses you suffer in connection with the website.</p><p>Without prejudice to the foregoing paragraph, you agree that the limitations of warranties and liability set out in this website disclaimer will protect Excella's officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as Excella.</p><p><strong>Unenforceable provisions</strong></p><p>If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law, that will not affect the enforceability of the other provisions of this website disclaimer.</p><p><strong>Indemnity</strong></p><p>You hereby indemnify Excella and undertake to keep Excella indemnified against any losses, damages, costs, liabilities and expenses (including without limitation legal expenses and any amounts paid by Excella to a third party in settlement of a claim or dispute on the advice of Excella's legal advisers) incurred or suffered by Excella arising out of any breach by you of any provision of these terms and conditions, or arising out of any claim that you have breached any provision of these terms and conditions.</p><p><strong>Breaches of these terms and conditions</strong></p><p>Without prejudice to Excella's other rights under these terms and conditions, if you breach these terms and conditions in any way, Excella may take such action as Excella deems appropriate to deal with the breach, including suspending your access to the website, prohibiting you from accessing the website, blocking computers using your IP address from accessing the website, contacting your internet service provider to request that they block your access to the website and/or bringing court proceedings against you.</p><p><strong>Variation</strong></p><p>Excella may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of this website from the date of the publication of the revised terms and conditions on this website. Please check this page regularly to ensure you are familiar with the current version.</p><p><strong>Assignment</strong></p><p>Excella may transfer, sub-contract or otherwise deal with Excella's rights and/or obligations under these terms and conditions without notifying you or obtaining your consent.</p><p>You may not transfer, sub-contract or otherwise deal with your rights and/or obligations under these terms and conditions.</p><p><strong>Severability</strong></p><p>If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.</p><p><strong>Entire agreement</strong></p><p>These terms and conditions, together with Excella's Privacy Policy constitute the entire agreement between you and Excella in relation to your use of this website, and supersede all previous agreements in respect of your use of this website.</p><p><strong>Law and jurisdiction</strong></p><p>These terms and conditions will be governed by and construed in accordance with the laws of NEVADA, USA, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of NEVADA, USA.</p>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/actionItems.html",
    "<div class=row-fluid><div class=\"col-md-12 no-padding\" id=board><alert type=info><strong>Prioritization & Action Items</strong> You'll be dot voting on the list of items below. Use all of your votes. You can add many votes on a single item or clear your votes and start again.</alert><view-themes ng-if=\"board.phase != phases.actionVotingEnded\" board-id=board.id themes=board.themes></view-themes><div ng-show=\"isScrumMaster && board.phase == phases.actionVotingEnded\" class=\"form-group row-fluid\"><label for=actionItem>New Action Item</label><input class=form-control id=actionItem placeholder=\"Add below\" ng-model=newActionItem><span class=help-block>Type in your action item above and then associate it with a feedback item below by clicking the + button next to it.</span></div><div class=row-fluid ng-if=\"board.phase == phases.actionVotingEnded\"><progressbar ng-show=\"!board.actionItems || board.actionItems.length == 0\" class=\"progress-striped active\" max=100 value=100><i>Tallying Votes...</i></progressbar><ol class=list-group><li class=list-group-item ng-repeat=\"actionItemGroup in board.actionItems track by $index\"><div><strong>{{actionItemGroup[0]}}</strong><a ng-show=isScrumMaster class=\"btn btn-sm btn-primary pull-right\" style=\"margin-top: -5px\" ng-click=addActionItem(actionItemGroup)><span class=\"glyphicon glyphicon-plus\"></a></div><ul><li ng-repeat=\"actionItem in actionItemGroup[1] track by $index\">{{actionItem}}</li></ul></li></ol></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/addFeedback.html",
    "<div class=\"col-md-6 no-padding\"><form role=form name=sendFeedbackForm ng-submit=sendFeedback()><error-field model=validation></error-field><div class=form-group><label for=feedback>Add Feedback</label><input class=form-control id=feedback placeholder=\"{{feedbackContext}}? Be concise.\" ng-model=feedback><span class=help-block>Your feedback will be sent anonymously.</span></div><div class=form-group><button type=submit class=\"btn btn-primary\" ng-disabled=\"isSaving || canSubmit()\">Send</button></div></form></div><div class=\"col-md-6 no-padding\"><view-feedback class=row-fluid board-id=boardId type=type feedback=getUserFeedback() feedback-context=Your></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/addTheme.html",
    "<form role=form name=sendThemeForm ng-submit=sendTheme()><error-field model=validation></error-field><div class=form-group><label for=theme>Add Theme</label><input class=form-control id=theme placeholder=\"Summarize theme feedback\" ng-model=theme></div><button type=submit class=\"btn btn-primary\">Send theme</button></form>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/branding.html",
    "<div style=\"height: 54px\"></div><div class=\"navbar navbar-default navbar-fixed-bottom\" style=\"background: white\"><div class=row-fluid><img src=images/excella_jsa.jpg class=\"img-responsive center-block excella-logo\"></div><div class=\"row-fluid text-center\"><a class=terms href=#/tos target=_blank>Terms</a></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/connectionStatus.html",
    "<span ng-if=\"status > 0 || showOnConnected\"><span ng-if=\"status == 2\"><light color=#c9302c></light><span class=\"hidden-xs hidden-sm\">Disconnected</span> &nbsp;</span> <span ng-if=\"status == 1\"><spinner size=15 color=#f0ad4e></spinner><span class=\"hidden-xs hidden-sm\">Reconnecting...</span> &nbsp;</span> <span ng-if=\"status == 0\"><light color=#5cb85c></light><span class=\"hidden-xs hidden-sm\">Connected!</span> &nbsp;</span></span>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/errorField.html",
    "<alert class=ng-hide type=danger ng-show=\"errors && errors.length > 0\"><strong>Error!</strong><ul class=errorList><li class=error ng-repeat=\"error in errors\">{{ error }}</li></ul></alert>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/folder.html",
    "<div class=\"panel panel-primary dropArea\" on-drop=dropFunction on-drag-enter=enterFunction on-drag-leave=leaveFunction><folder-heading class=\"panel-heading {{name || nameIsSet ? '' : 'height-zero'}} readonly\" readonly name=name name-is-set=nameIsSet></folder-heading><ul class=list-group><li class=\"list-group-item draggable {{ colorAnimationClass }}\" ng-if=!ignoreDrag ng-repeat=\"(index, item) in list track by index\" data-index={{index}} data-value={{item}}>{{item}}</li><li class=list-group-item ng-if=ignoreDrag ng-repeat=\"(index, item) in list track by index\">{{item}}</li></ul></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/identifyThemes.html",
    "<div class=row-fluid><folder-holder class=\"col-xs-11 col-sm-11 col-md-12 col-lg-12\" lists=themes readonly></folder-holder></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/navBar.html",
    "<nav class=\"navbar navbar-default navbar-fixed-top\" role=navigation><div class=container-fluid><div class=\"btn-group navbar-btn pull-right\" ng-if=participants dropdown=\"\" is-open=status.isopen><button type=button class=btn dropdown-toggle=\"\" ng-disabled=disabled><span class=\"glyphicon glyphicon-user badge user-badge\">{{participants.length}}</span><span class=\"hidden-xs hidden-sm pad-left\">Participants</span> <span class=caret></span></button><ul class=dropdown-menu role=menu><li role=presentation ng-repeat=\"participant in participants track by $index\"><a role=menuitem>{{participant}}</a></li></ul></div><connection-status show-on-connected=false class=\"pull-right navbar-text\" status=socketStatus></connection-status><a class=navbar-brand>{{boardName || \"Excella Retro\"}}</a></div></nav><div style=\"height: 50px\"></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/scrumMasterTools.html",
    "<div class=row-fluid><div class=\"col-md-12 no-padding\" id=boardTools><div class=\"panel panel-danger\"><div class=panel-heading><div class=row-fluid style=\"height: 18px\"><div class=col-xs-11><h3 class=panel-title>Facilitator Tools</h3></div><div class=\"col-xs-1 no-padding\"><span id=collapsor class=\"glyphicon glyphicon-chevron-up pull-right\"></span> </div></div></div><div class=panel-body><div class=\"row-fluid collapse in\"><div class=\"col-sm-6 col-md-6 col-lg-4\"><div class=row-fluid>Invite Participants</div><a class=\"btn btn-default glyphicon glyphicon-link\" target=_blank ng-href={{participantJoinLink(board.id)}} title=\"Copy link to send participants\"></a> <a class=\"btn btn-default glyphicon glyphicon-envelope\" ng-href=\"{{participantMailToLink(board.id, board.title)}}\" title=\"Send email to participants\"></a><div><form name=rc><span class=input-group><span class=\"input-group-addon glyphicon glyphicon-pencil\"></span><input class=form-control name=retroCode ng-model=boardId readonly style=\"max-width: 100px\"></span></form></div></div><div class=\"col-sm-3 col-md-3 col-lg-2\"><div>Admin</div><a class=\"btn btn-warning glyphicon glyphicon-link\" ng-href=\"{{scrumMasterAccessLink(board.id, board.scrumMasterKey)}}\" title=\"Copy link to access as Facilitator\"></a> <a class=\"btn btn-danger glyphicon glyphicon-off\" ng-click=closeRetro()></a></div><div class=\"col-sm-3 col-md-3 col-lg-2\"><div>Live Stats</div><a class=\"btn btn-success\" ng-click=viewLiveFeedback()>{{boardStats.wellCount}}</a> <a class=\"btn btn-warning\" ng-click=viewLiveFeedback()>{{boardStats.improveCount}}</a></div><hr class=no-padding></div><div class=row-fluid ng-if=\"board.phase != phases.summary\"><div class=col-xs-12><div><a class=\"btn btn-primary glyphicon glyphicon-play\" ng-click=goToNextPhase()></a> <span>{{actionText}}</span></div></div></div></div></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/spinner.html",
    "<div style=\"position: relative;\n" +
    "    width: {{fullSize}}px;\n" +
    "    height: {{fullSize}}px;\n" +
    "    display:inline-block\"><div ng-repeat=\"index in armList\" style=\"width:{{100 * scale}}%;\n" +
    "        top: {{top + fixPosition}}px;\n" +
    "        left: {{fixPosition}}px;\n" +
    "        height: {{thicknessPixels}}px;\n" +
    "        position: absolute;\n" +
    "        transform: rotate(-{{360 * index / count + 90}}deg)\"><div style=\"height: 100%;\n" +
    "            width: 30%;\n" +
    "            position: absolute;\n" +
    "            left: 70%;\n" +
    "            {{color ? 'background:'+color+';' : ''}}\n" +
    "            border-radius: {{size}}px;\n" +
    "            -webkit-animation-delay: -{{interval * index / count}}s;\n" +
    "            animation-delay: -{{interval * index / count}}s;\n" +
    "            -webkit-animation-duration: {{interval}}s;\n" +
    "            animation-duration: {{interval}}s\"></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/summary.html",
    "<div class=row-fluid><div class=\"col-md-12 no-padding\" id=board><alert type=info><strong>Summary</strong> You may save or print this page. Once your Facilitator closes this retrospective, you will not be able to access this information again.</alert><div class=row-fluid><h3>What Went Well?</h3><ol class=list-group><li class=list-group-item ng-repeat=\"actionItemGroup in board.wellFeedback track by $index\"><div><strong>{{actionItemGroup[0]}}</strong></div><ul><li ng-repeat=\"actionItem in actionItemGroup track by $index\" ng-show=!$first>{{actionItem}}</li></ul></li></ol></div><div class=row-fluid><h3>What Needs To Be Improved?</h3><ol class=list-group><li class=list-group-item ng-repeat=\"actionItemGroup in board.improveFeedback track by $index\"><div><strong>{{actionItemGroup[0]}}</strong></div><ul><li ng-repeat=\"actionItem in actionItemGroup track by $index\" ng-show=!$first>{{actionItem}}</li></ul></li></ol></div><div class=row-fluid><h3>Prioritized Action Items</h3><ol class=list-group><li class=list-group-item ng-repeat=\"actionItemGroup in board.actionItems track by $index\"><div><strong>{{actionItemGroup[0]}}</strong></div><ul><li ng-repeat=\"actionItem in actionItemGroup[1] track by $index\">{{actionItem}}</li></ul></li></ol></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/viewFeedback.html",
    "<div class=\"panel panel-default\"><div class=panel-heading><strong>{{feedbackContext}} Feedback</strong></div><div class=panel-body ng-if=\"!feedbackList() || feedbackList().length == 0\">No feedback</div><div class=container-fluid><div class=row ng-repeat=\"feedback in feedbackList() track by $index\"><div class=\"col-xs-8 col-sm-8\" style=\"word-wrap: break-word\"><span e-name=feedback editable-text=feedbackList()[$index].feedback[0] ng-model=feedback e-form=editFeedbackForm ng-show=!editFeedbackForm.$visible>{{feedback.feedback[0]}}</span></div><div class=\"col-xs-4 col-sm-4 text-right\"><form editable-form=\"\" name=editFeedbackForm ng-show=editFeedbackForm.$visible onbeforesave=editFeedback()><button type=submit ng-disabled=editFeedbackForm.$waiting class=\"btn btn-primary glyphicon glyphicon-ok\"><button type=button ng-disabled=editFeedbackForm.$waiting ng-click=editFeedbackForm.$cancel() class=\"btn btn-default glyphicon glyphicon-remove\"></form><div ng-show=feedback.isOwn><button class=\"btn btn-default glyphicon glyphicon-pencil\" ng-click=editFeedbackForm.$show() ng-show=!editFeedbackForm.$visible><button class=\"btn btn-default glyphicon glyphicon-trash\" ng-click=\"deleteFeedback($index); editFeedbackForm.$hide()\" ng-show=!editFeedbackForm.$visible></div></div><div class=clearfix></div></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/viewThemes.html",
    "<div class=\"panel panel-default\"><div class=panel-heading>Prioritize<span class=pull-right><span class=badge ng-if=canVote>Unused Votes: {{unusedVotes}}</span><a class=\"btn btn-sm btn-danger\" ng-disabled=!canVote ng-click=clearVotes() style=\"margin-left: 5px; margin-top: -5px\">Clear <span class=\"glyphicon glyphicon-refresh\"></a></span></div><div class=panel-body ng-if=\"!themes || themes.length == 0\">No items</div><ul class=list-group><li class=list-group-item ng-repeat=\"theme in themes track by $index\"><div class=input-group><span class=input-group-btn><a class=\"btn btn-primary\" ng-disabled=!canVote ng-click=upVote(theme.id)><span class=badge style=\"margin-right: 5px\">{{theme.votes}}</span><span class=\"glyphicon glyphicon-thumbs-up\"></a></span> <span class=form-control>{{theme.description}}</span> <span class=input-group-btn></span></div></li></ul></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/whatNeedsImprovement.html",
    "<div class=row-fluid><div class=\"col-md-12 no-padding\" id=board><alert type=info><strong>What Needs To Be Improved?</strong><span ng-show=!isScrumMaster>Once your Facilitator initiates feedback gathering you may share your feedback.</span></alert><span ng-show=\"isScrumMaster && board.phase == phases.improveFeedbackStarted\" class=help-block>Ask your team to provide feedback now. Time box the exercise and encourage everyone to share feedback.</span><add-feedback ng-if=\"board.phase == phases.improveFeedbackStarted\" feedback-context=\"What Needs To Be Improved\" board=board is-scrum-master=isScrumMaster type=improve></add-feedback><div class=row-fluid ng-if=\"board.phase == phases.improveFeedbackCompleted\"><span ng-show=isScrumMaster class=help-block>Group feedback together by dragging and dropping one on to another. The initial item being dropped on will define the header for that group of feedback. You may re-arrange by un-grouping.</span><folder-holder class=\"col-xs-11 col-sm-11 col-md-12 col-lg-12\" on-change=sendThemes readonly lists=board.improveFeedback></folder-holder></div></div></div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/directives/whatWentWell.html",
    "<div class=row-fluid><div class=\"col-md-12 no-padding\" id=board><alert type=info><strong>{{whatWentWell}}</strong> <span ng-show=!isScrumMaster>Once your Facilitator initiates feedback gathering you may share your feedback.</span></alert><span ng-show=\"isScrumMaster && board.phase == phases.wellFeedbackStarted\" class=help-block>Ask your team to provide feedback now. Time box the exercise and encourage everyone to share feedback.</span><add-feedback ng-if=\"board.phase == phases.wellFeedbackStarted\" feedback-context={{whatWentWell}} type=well board=board is-scrum-master=isScrumMaster></add-feedback><div class=row-fluid ng-if=\"board.phase == phases.wellFeedbackCompleted\"><span ng-show=isScrumMaster class=help-block>Group feedback together by dragging and dropping one on to another. The initial item being dropped on will define the header for that group of feedback. You may re-arrange by un-grouping.</span><folder-holder class=\"col-xs-11 col-sm-11 col-md-12 col-lg-12\" on-change=sendThemes readonly lists=board.wellFeedback></folder-holder></div></div></div>");
}]);
})();
