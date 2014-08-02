var hintLog = angular.hint = require('angular-hint-log');
module.exports = function(attrs, ngAppFound) {
  if(attrs['ng-app'] && ngAppFound) {
    hintLog.logMessage('##Modules## ng-app may only be included once. The module "' +
      attrs['ng-app'].value + '" was not used to bootstrap because ng-app was already included.');
  }
  return attrs['ng-app'] ? attrs['ng-app'].value : undefined;
};
