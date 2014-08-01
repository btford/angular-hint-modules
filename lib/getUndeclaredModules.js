var getModule = require('./getModule'),
  dictionary = Object.keys(require('./moduleData').createdModules),
  suggest = require('suggest-it')(dictionary);

module.exports = function(loadedModules) {
  var undeclaredModules = [];
  for( var module in loadedModules) {
    var cModule = getModule(module, true);
    if(!cModule) {
      var match = suggest(module),
        suggestion = (match) ? '; Try: "'+match+'"' : '',
        message = 'Module "'+module+'" was loaded but does not exist'+suggestion+'.';
      undeclaredModules.push({module:null, message:message});
    }
  }
  return undeclaredModules;
};
