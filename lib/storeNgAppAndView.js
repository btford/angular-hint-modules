var getNgAppMod = require('./getNgAppMod'),
  inAttrsOrClasses = require('./inAttrsOrClasses'),
  storeDependencies = require('./storeDependencies'),
  modData = require('./moduleData');

module.exports = function(doms) {
  var bothFound,
      ngViewFound,
      elem,
      isElemName,
      isInAttrsOrClasses,
      ngAppMod;

  for(var i = 0; i < doms.length; i++) {
    elem = doms[i];
    isElemName = elem.nodeName.toLowerCase() === 'ng-view';
    isInAttrsOrClasses = inAttrsOrClasses(elem.attributes);

    ngViewFound = isElemName || isInAttrsOrClasses;

    ngAppMod = getNgAppMod(elem.attributes, modData.ngAppFound);
    modData.ngAppFound = modData.ngAppFound || ngAppMod;

    if(ngAppMod) {
      storeDependencies(ngAppMod, true);
    }
    modData.ngViewExists = ngViewFound ? true : modData.ngViewExists;

    if(bothFound) {
      break;
    }
  }
};
