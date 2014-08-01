var hintLog = angular.hint = require('angular-hint-log');
module.exports = function(str) {
  if(str.toLowerCase() === str || str.charAt(0).toUpperCase() === str.charAt(0)) {
    hintLog.logMessage('##Modules## The best practice for' +
      ' module names is to use lowerCamelCase. Check the name of "' + str + '".');
    return false;
  }
  return true;
};
