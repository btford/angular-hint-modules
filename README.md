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

#### Missing Namespace
It is important for modules we create to have their own unique namespace so as to not conflict with existing modules in Angular or external libraries that may be used. As in the example below, if a module with name 'breadcrumb' was created, you would be warned and prompted to use a more appropriate name that adheres to namespace best practices.
```javascript
angular.module('breadcrumbs').
  directive('myComponent', function() { ... };
});
```

#### Creating and Loading Modules
AngularHintModules also notifies you of common problems regarding the creation and loading of modules.

The following code snippit will be the example for the following sections:

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

#### ngView with ngRoute
After routing was seperated from Angular.js, it was required to have `ngRoute` as a dependency for your main module. Since this change, `ngRoute` often got left out, so this module also notifies you if you have routing in your application without requiring `ngRoute`.

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
