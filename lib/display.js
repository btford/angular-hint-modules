var hintLog = angular.hint = require('angular-hint-log'),
  MODULE_NAME = 'Modules',
  SEVERITY_ERROR = 1;
module.exports = function(unusedModules) {
  unusedModules.forEach(function(module) {
    hintLog.logMessage(MODULE_NAME, module.message, 1);
  });
};
