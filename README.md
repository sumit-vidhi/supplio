# Angular 7 Boilerplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1. The purpose of this project is to demonstrate the Angular 7 best practices for directory structure and organization of code.

1. Overview

    * [Folder structure](#folder-structure)
    * [Design System](#design-system)
    * [Code comments standards](#code-comments-standards)
    * [Setting Up Application Environments and Configuration](#setting-application-environments-and-configuration)
    * [Custom paths](#custom-paths)
    * [Angular Cli Help](#code-scaffolding)
    * [Running Development server](#running-development-server)
    * [Making Build](#making-build)
    * [Running Unit Tests](#running-unit-tests)

2. How to Use

    * [Configuration]()
    * [Modules]()
    * [App Module]()
    * [Core Module]()
    * [Shared Module]()
    * [Theme Module]()
    * [Layouts and Router Outlet]()
    * [Routing and lazy Loading]()
    * [Guards and Protecting Routes]()
    * [Resolvers]()
    * [Http Interceptor]()
    * [Services and API Calls]()
    * [Interface and Classes]()

### Folder Structure

```
└───src                                         
    ├───app                                     
    │   ├───configs                             # For configuration files.
    │   ├───core                                # For core dependencies that was only include once in the application
    │   │   ├───interceptors                    
    │   │   └───services                        
    │   └───modules                             # Application modules goes here.
    │       ├───auth                            # For authorization dependencies.
    │       │   ├───components                  
    │       │   │   ├───login                   
    │       │   │   └───master
    │       │   └───services                    
    │       ├───shared                          # For dependencies that was shared across all the modules
    │       │   ├───decorators                  
    │       │   ├───interfaces                  
    │       │   ├───models                      
    │       │   ├───resolvers                   
    │       │   └───services                    
    │       └───theme                           # For dependencies that was related to design and theme of the application
    │           └───basic
    │               └───components
    │                   └───layout
    │                       ├───footer
    │                       ├───header
    │                       └───layout  
    ├───assets                                  # For assets of the application
    │   ├───images                              
    │   └───scss
    │       └───basic
    └───environments                            # For application environment configuration

```


### Design System

You can find the different design system organized under `theme` module. 
Just include the theme module or create your own one

* Custom Theme(Named as Basic Theme)

We are using `scss` for generating css in this project.


## Code comments Standards
`Note:We are following the above coding comments standards in this project`


#### Naming Conventions

We are using the following naming conventions

Methods
`lowerCamelCase` for example: `getUserDetails`

Variables
`lowerCamelCase` for example: `postList`

Constants Variables
`lowerCamelCase` for example: `fooBar`
Configuration Constants Variables
`Uppercase` for example: `AUTH_TOKEN_NAME`

Classes/Modules/Pipes/Guards etc
`UpperCamelCase` for example: `UserModule`,`AuthService`


#### Common Comments Standard

```javascript
/**
 * Type - @class/@service/@module/@interface/@function etc 
 * @name TypeNameHere
 * @description
 * Description goes here...
 * 
 * @note
 * Any related note
 * @param {Object} {key:value} pair of user objects
 * @returns {Value} description 
 * @example 
 * Example goes here
 */
```

#### Code comments standard Examples

##### Function
```javascript
/**
* @function
* @name FunctionName
* @description
* Description of the function goes here..
* @param {Object} {key:value} pair of user objects
* @returns {none}
* @example 
* function example goes here
*/
```

##### Service
```javascript
/**
* @class
* @name ClassName
* Service
* @description
* Description of the service goes here..
* @note any note
*/
```

##### Module
```javascript
/**
* @module ModuleName
* @description
* Description goes here..
* @note any note
*/
```

#### Components
```javascript
/**
 * Component
 * @name AppComponent
 * @description
 * This is the entry component of the application. 
 * On application startup, this component is loaded
 */
```


## Setting Up Application Environments and Configuration


##### Creating the application Environments

In your Angular project, you shall find `angular.json` file. 
Inside this file, you can add a new section under 
`projects -> architect -> build`

Here is an example with test and production environments.

```javascript
"build": {
    "configurations": {
        "production": {
            "fileReplacements": [
                {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.prod.ts"
                }
            ],
        },
        "test": {
            "fileReplacements": [
                {
                    "replace": "src/environments/environment.ts",
                    "with": "src/environments/environment.test.ts"
                }
            ]
        }
    }
}
```

there are other more options for generating/optimizing the build.
For more workspace configuration options please [visit](https://angular.io/guide/workspace-config).

`You can find more [here](#code-scaffolding) for passing configuration flags while serving and building the application.`


##### Using configuration environment variable

You can define your environment files in the `environments` folder and Declare the parameters.
In this application setup, we have define three environments `dev`,`test`,`production`. Sample is given below

```javascript
export const environment = {
  env: 'env name',
  host: 'API url',
  [name]:[value]
};
```

#### Using environment variable

```javascript
/* Importing the file */
import { environment } from '@environment/environment';

/* Using environment variable */
if (environment.production) {
  // Do your action
}
```

`Note: These configuration are replaced at the time of serving the application or generating a production build.`


## Custom paths

We have define some custom paths in the `tsconfig.json` file.

```javascript
"paths": {
    "@app/*": ["src/app/*"],
    "@configs/*": ["src/app/configs/*"],
    "@core/*": ["src/app/core/*"],
    "@interceptors/*": ["src/app/core/interceptors/*"],
    "@theme/*": ["src/app/modules/theme/*"],
    "@modules/*": ["src/app/modules/*"],
    "@environment/*": ["src/environments/*"],
    "@shared/*": ["src/app/modules/shared/*"]
}
```
Using any of these paths to import dependencies

```javascript
import { appSettings } from '@configs/app-settings.config';
```

You can add also define your custom paths in `tsconfig.json` under `paths` section. 
Sometimes it gives error of newly added custom path in the editors, try to re-open it to effect the new changes.



## Code Scaffolding

Generating component-name component

```console
ng generate component component-name
```

You can also use to generate  directive|pipe|service|class|guard|interface|module with the above command

```console
ng generate directive|pipe|service|class|guard|interface|enum|module
```

Generating component in the specific folder

```console
ng generate component {folder-path}/component-name
```

If it gives error about importing modules, add `--skip-import` flag in the command


## Running Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##### With specific environments

Run `ng serve --configuration=dev --aot` for dev server
Run `ng serve --configuration=test --aot` for test server 
Run `ng serve --configuration=production --aot` for production server


## Making Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

##### With specific environments
Run `ng build --prod --configuration=dev` for development
Run `ng build --prod --configuration=test` for test environment
Run `ng build --prod --configuration=production` for production environment


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

##### With specific environments
Run `ng test --configuration=dev` for development
Run `ng test --configuration=test` for test environment
Run `ng test --configuration=production` for production environment


## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

##### With specific environments
Run `ng e2e --prod --configuration=dev` for development
Run `ng e2e --prod --configuration=test` for test environment
Run `ng e2e --prod --configuration=production` for production environment


## Running linting
Run `ng lint` to execute the linting of code. All the rules for linting is predefined in `tslint.json` file.
You can modify them as per needed



#### Enable single quote for import statement

[Follow this link](https://gist.github.com/asanchezr/8bdb72271f4d1c56bf5dab865778cdbe)


#### used packaged

1. [http-status-codes](https://github.com/prettymuchbryce/http-status-codes) for mapping http status code
2. [Compodoc](https://compodoc.app/) for generating documentation


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

