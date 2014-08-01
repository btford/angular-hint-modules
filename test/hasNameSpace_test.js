var hasNameSpace = require('../lib/hasNameSpace.js');
var hintLog = angular.hint;

describe('hasNameSpace()', function() {
  afterEach(function() {
    hintLog.flush();
  });

  it('should check that a module has a correctly formatted name', function() {
    expect(hasNameSpace('MyApp')).toBe(false);
    expect(hasNameSpace('myapp')).toBe(false);
    expect(hasNameSpace('myApp')).toBe(true);
  });
});