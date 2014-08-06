var getModule = require('./getModule'),
  IGNORED = ['ngHintControllers', 'ngHintDirectives', 'ngHintDOM', 'ngHintEvents',
    'ngHintInterpolation', 'ngHintModules'];
  SEVERITY_WARNING = 2;

module.exports = function(createdModules) {
  var unusedModules = [];
  for(var module in createdModules) {
    if(!getModule(module)) {
      var cModule = createdModules[module],
        message = 'Module "' + cModule.name + '" was created but never loaded.';
      if(IGNORED.indexOf(cModule.name) === -1) {
        unusedModules.push({module:cModule, message:message, severity:SEVERITY_WARNING});
      }
    }
  }
  return unusedModules;
};
