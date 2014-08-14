var hintLog = angular.hint = require('angular-hint-log'),
  MODULE_NAME = 'Modules',
  SEVERITY_ERROR = 1;
module.exports = function(attrs, ngAppFound) {
  if(attrs['ng-app'] && ngAppFound) {
    var ngAppValue = attrs['ng-app'].value;
    hintLog.logMessage(MODULE_NAME, 'ng-app may only be included once. The module "' +
      ngAppValue + '" was not used to bootstrap because ng-app was already included.',
      SEVERITY_ERROR);
  }
  return attrs['ng-app'] ? ngAppValue : undefined;
};
