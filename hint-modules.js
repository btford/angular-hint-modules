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

angular.module = function() {
  var module = originalAngularModule.apply(this, arguments),
    name = module.name;
    modules[name] = module;
  hasNameSpace(module.name);
  var modToCheck = getModule(module.name, true);
  if(modToCheck && modToCheck.requires.length && module.requires.length) {
    if(!modData.createdMulti[module.name]) {
      modData.createdMulti[module.name] = [getModule(module.name,true)];
    }
    modData.createdMulti[module.name].push(module);
  }
  modData.createdModules[module.name] = module;
  return module;
};

angular.module('ngHintModules', []).config(function() {
  var ngAppMod = modules[modData.ngAppMod];
  storeUsedModules(ngAppMod, modules);
  start();
});
