'use strict';

var storeDependencies = require('./lib/storeDependencies'),
  getModule = require('./lib/getModule'),
  start = require('./lib/start'),
  storeNgAppAndView = require('./lib/storeNgAppAndView'),
  storeUsedModules = require('./lib/storeUsedModules'),
  hasNameSpace = require('./lib/hasNameSpace'),
  modData = require('./lib/moduleData');

var doc = Array.prototype.slice.call(document.getElementsByTagName('*')),
  originalAngularModule = angular.module,
  modules = {};

storeNgAppAndView(doc);

angular.module = function(name, requiresOriginal) {
  var module = originalAngularModule.apply(this, arguments),
      name = module.name;

  module.requiresOriginal = requiresOriginal;
  modules[name] = module;
  hasNameSpace(name);
  var modToCheck = getModule(name, true);

  if(modToCheck && modToCheck.requiresOriginal !== module.requiresOriginal) {
    if(!modData.createdMulti[name]) {
      modData.createdMulti[name] = [getModule(name,true)];
    }
    modData.createdMulti[name].push(module);
  }
  modData.createdModules[name] = module;
  return module;
};

angular.module('ngHintModules', []).config(function() {
  var ngAppMod = modules[modData.ngAppMod];
  storeUsedModules(ngAppMod, modules);
  start();
});
