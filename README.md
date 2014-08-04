# Angular Hint Modules [![Build Status](https://travis-ci.org/angular/angular-hint-modules.svg?branch=master)](https://travis-ci.org/angular/angular-hint-modules) [![Code Climate](https://codeclimate.com/github/angular/angular-hint-modules.png)](https://codeclimate.com/github/angular/angular-hint-modules)

This hinting module is part of the overall tool [AngularHint](https://github.com/angular/angular-hint)
that aims to help you spend less time finding silent errors in your code and more time programming.
Loading this module will provide warnings specific to AngularJS modules.

See the [AngularHintModules NPM Module](https://www.npmjs.org/package/angular-hint-modules).

##Usage

Install the [AngularHint NPM module](https://www.npmjs.org/package/angular-hint)
and use `ng-hint` or `ng-hint-include='modules'` to
enable AngularHintModules. Further installation information is available on the
[main AngularHint repository](https://github.com/angular/angular-hint#usage).

##Features

#### AngularHintModules identifies:
  - [Modules missing proper namespaces](#missing-namespace)
  - [Modules created but never loaded](#creating-and-loading-modules)
  - [Multiple modules created with same name](#creating-and-loading-modules)
  - [Undeclared modules loaded](#creating-and-loading-modules)
  - [Using ngView without ngRoute](#ngview-with-ngroute)
  - [Multiple uses of ng-app](#ng-app)

####<a name="missing-namespace"></a> Missing Namespace
It is important for modules to have their own unique namespace so as to not conflict with existing modules in Angular or external libraries that may be used. Specifically, a module should be named with lowerCamelCase. Moreover, all modules in an application should be prefixed with a consistent prefix, as in the Angular `ng` prefix. For example, a travel application could have
the prefix `ta` to stand for 'travel application'. This special prefix would ensure that the modules created
for this application would have different names, and hence namespaces, as compared to other third party components.

For instance, say we create a module `calendar` for this travel application:

```javascript
angular.module('calendar').
  directive('myComponent', function() { ... };
});
```

Later, we decide to use a third party module that happens to contain a different module called
`calendar` in addition to the functionality that we would like to use:

```javascript
angular.module('calendar').
  directive('thirdPartyComponent', function() { ... };
});
```
These modules would overwrite each other. However, if we name our own modules with our namespace best practice,
we avoid this issue:


```javascript
angular.module('taCalendar').
  directive('myComponent', function() { ... };
});
```
AngularHintModules provides a warning if modules are not named with lowerCamelCase.


####<a name="creating-and-loading-modules"></a> Creating and Loading Modules
AngularHintModules also notifies you of common problems regarding the creation and loading of modules.

The following code snippet will be the example for the following sections:

```Javascript
angular.module('createdAndLoaded',[]);
angular.module('createdAndLoaded',[]);
angular.module('createdButNotLoaded',[]);
angular.module('testModule',
  ['ngHintModules','createdAndLoaded', 'createdButNLoadd','iDontEvenexist']);

```
In the example above you would be warned that:
- The `createdButNotLoaded` module was created but that it was never loaded into the application.
- The `createdButNLoadd` module was not found and that you should try `createdButNotLoaded`.
- The `createdAndLoaded` module name was used twice and the first will be overwritten.
- The `iDontEvenexist` module was loaded but it was never created.

####<a name="ngview-with-ngroute"></a> ngView with ngRoute
Routing has been separated from Angular.js into a separate `ngRoute` module. To use routing, `ngRoute` must be
loaded as a dependency for your main module. This module notifies you if you have routing in your application but
you have not loaded `ngRoute`.

###<a name="ng-app"></a> Multiple uses of ng-app
The `ng-app` directive is provided to bootstrap a module as the main module of an Angular application.

```
<!doctype html>
<html ng-app='sampleApp' ng-hint>
  <head>
    <meta charset="utf-8">
    <title>Angular Hint Example</title>
  </head>
  <body ng-controller="HintController">
   ...
</html>
```

However, this directive can only bootstrap one module as the main module of the application.
Using the directive multiple times will not bootstrap multiple modules. The following is an error,
and will produce an AngularHintModules message:

```
<!doctype html>
<html ng-app='sampleApp' ng-hint>
  <head>
    <meta charset="utf-8">
    <title>Angular Hint Example</title>
  </head>
  <body ng-app='sampleAllHint' ng-controller="HintController">
    ...
  </body>
</html>

```

##Contributing

Want to improve AngularHintModules or other facets of AngularHint? We'd love to get your help! See the [Contributing Guidelines](https://github.com/angular/angular-hint/blob/master/CONTRIBUTING.md).

## [License](LICENSE)

Copyright 2014 Google, Inc. http://angularjs.org

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
