var getNgAppMod = require('../lib/getNgAppMod');
var hintLog = angular.hint;

describe('getNgAppMod()', function() {
  it('should return the value of the ng-app attribute', function() {
    var attributes = {
        'width': {value: '10px'},
        'id': {value: 'idName'},
        'ng-app': {value: 'testModule'}
    };
    var res = getNgAppMod(attributes);
    expect(res).toBe('testModule');
  });

  it('should log if multiple ng-apps are detected', function() {
    var attributes = {
        'width': {value: '10px'},
        'id': {value: 'idName'},
        'ng-app': {value: 'testModule'}
    };
    var foundNgApp = getNgAppMod(attributes, false);
    getNgAppMod(attributes, foundNgApp);
    var log = hintLog.flush();
    expect(log['Modules']['Error Messages']).toEqual(['ng-app may only be included once. The module ' +
      '"testModule" was not used to bootstrap because ng-app was already included.']);
  });
});