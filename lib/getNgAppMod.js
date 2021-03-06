var hintLog = angular.hint = require('angular-hint-log'),
  MODULE_NAME = 'Modules',
  SEVERITY_ERROR = 1;
 module.exports = function(attrs, ngAppFound) {
   if(attrs['ng-app'] && ngAppFound) {
     hintLog.logMessage(MODULE_NAME, 'ng-app may only be included once. The module "' +
      attrs['ng-app'].value + '" was not used to bootstrap because ng-app was already included.',
      SEVERITY_ERROR);
   }
  return attrs['ng-app'] ? attrs['ng-app'].value : undefined;
 };


