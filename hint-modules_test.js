var hintLog = angular.hint;
var start = require('./lib/start');
var modData = require('./lib/moduleData');
describe('hintModules', function() {
  beforeEach(function() {
    modData.createdModules = {
      'createdAndNotLoaded': {name:'createdAndNotLoaded', requires: []},
      'testModule': {name:'createdAndNotLoaded', requires: []}
    }
    modData.loadedModules = {
      'doesntExist': 'doesntExist',
      'testModule': 'testModule'
    }
    modData.createdMulti = {
      'testModule': 'testModule'
    }
  });

  it('should identify modules created and not loaded', function() {
    angular.module('createdAndNotLoaded', []);
    start();
    expect(hintLog.flush()['Modules']['Warning Messages'][0]).toBe('Module "createdAndNotLoaded" was' +
      ' created but never loaded.');
  });


  it('should identify modules loaded that do not exist', function() {
    angular.module('testModule', ['doesntExist']);
    start();
    var log = hintLog.flush();
    expect(log['Modules']['Error Messages'][0]).toBe('Module "doesntExist" was loaded but' +
      ' does not exist.');
  });


  it('should identify modules that have been loaded multiple times', function() {
    angular.module('testModule', []);
    start();
    expect(hintLog.flush()['Modules']['Warning Messages'][1]).toBe('Multiple modules with name ' +
      '"testModule" are being created and they will overwrite each other.');
  });


  it('should ignore modules loaded twice if one is just being called', function() {
    angular.module('testModule2', []);
    angular.module('testModule2').controller('controller', [function(){}]);
    start();
    var results = Object.keys(hintLog.flush()['Modules']);
    var finResult = results.some(function(res){
      return res === 'Multiple modules with name "testModule" are being created and they will ' +
        'overwrite each other.';
    });
    expect(finResult).toBe(false);
  });


  it('should warn if modules are not named with lowerCamelCase', function() {
    angular.module('testmodule', []);
    start();
    expect(hintLog.flush()['Modules']['Suggestion Messages'][0]).toBe('The best practice for' +
      ' module names is to use lowerCamelCase. Check the name of "testmodule".');

    angular.module('Testmodule', []);
    expect(hintLog.flush()['Modules']['Suggestion Messages'][0]).toBe('The best practice for' +
      ' module names is to use lowerCamelCase. Check the name of "Testmodule".');
  });
});