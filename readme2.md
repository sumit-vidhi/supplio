### Configuration

All the application level configuration defined in the `config` folder. We already have two files defined in this folder:-

1. app-api-urls.config.ts
2. app-settings.config.ts


1. In `app-api-urls.config.ts` file, we will define all the **api url's**

##### Sample Example
```javascript
export const appApiUrl: CommonBase = {
    auth: {
        login: 'login'
    }
};
```

In the above example we declared a `path` of the api request url. IN the similar fashion you can organize and define the routes.
Now you're thinking about the base url right? We will cover that in [Services and API Calls](#services-api-calls)

##### using api url configurations
```javascript
// Importing the configuration file
import { appApiUrl } from "@configs/app-api-urls.config";

// Accessing path variables as Object notation
appApiUrl.auth.login

// Using paths in the api url
this.commonHttp.post(appApiUrl.auth.login,params)
```

2. In `app-settings.config.ts` file, we will define all the **app level configuration parameters**

##### Sample Example
```javascript
export const appSettings: CommonBase = {
  appTitle: 'Angular 7 Boilerplate',
  appLogo: ''
};
```

In the above sample, we have define a way to organize/declare configuration parameters. You can modify it as needed


##### using api url configurations
```javascript
// Importing the configuration file
import { appSettings } from "@configs/app-settings.config";

// Accessing path variables as Object notation
appSettings.appTitle
```


We have also defined other `constants` in this file, 
that was related to Global terms like Auth Token Name, Toke header name etc. You're free to modify them as per needed. See below
It is advised to create least number of config files.

```javascript
export const TOKEN_NAME = 'api_token'; // Local storage Key where user JWT token stored
export const TOKEN_HEADER_KEY = 'Authorization'; // JWT token header name
export const AUTH_PREFIX = 'Bearer'; // JWT token header name. It depends on your application, which header need to used. Modify it per needed.
export const USER_STORAGE_KEY = 'user'; // Local storage Key name where login user detail stored
export const ROLE_KEY = 'roles'; //  Local storage Key name where login user roles stored, if any.
export const DM_PREFIX = 'A7B_APP_'; // Any prefix to use for local storage to make it unique
export const APP_USER = 'A7B_APP_USER'; // Local storage Key name where login user all detail stored
```


### Modules
Angular apps are modular and Angular has its own modularity system called NgModules. NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities. They can contain components, service providers, and other code files whose scope is defined by the containing NgModule. They can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.

We have organized the all the modules in the `module` folder expect the `core` module. It is advised to create all the application modules in this folder.
Please follow the code commenting standards while creating modules as per specification

Directory structure will be:-

```dir
└───modules
    ├───module 1
        ├───decorators 
        ├───interfaces 
        ├───models     
        ├───resolvers  
        |───services
        ├───components
        ├───routing
```


##### Description

    * interfaces = Define all the interfaces
    * models     = Define all the models used in the module
    * resolvers  = Define all the resolvers
    * services   = Define all the services related to the module
    * interfaces = Define all the interfaces
    * components = Define all the components of this module
    * routes-file     = Define the route file of module
    * [custom]   = Your custom folder/file

Example Module

```javascript
/**
 * @module AuthModule
 * @description
 * Auth module of the application.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the routing module
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';

@NgModule({
  declarations: [AuthRoutingModule.components],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [AuthRoutingModule.components]
})
export class AuthModule { }
```

As you can see in the example instead of declaring all components and providers in the 
`providers: [AuthRoutingModule.components]` and `declarations: [AuthRoutingModule.components]`,
we have used the `AuthRoutingModule` member to declare all that. It will make Module more cleaner

Example of `providers` and `components` members of routing class `AuthRoutingModule`

```javascript
/**
 * @module AuthRoutingModule
 * @description
 * Auth routing module of the application.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importing components
import { MasterComponent } from '@modules/auth/components/master/master.component';
import { LoginComponent } from '@modules/auth/components/login/login.component';

// Importing services
import { AuthService } from '@modules/auth/services/auth.service';

// Importing guards
import { HasTokenResolver } from '@shared/resolvers/resolver.service';

// Defining the routes
// We have defined one master component in each module, that will take care of all the layout
const routes: Routes = [
  {
    path: '', component: MasterComponent, children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
      },
      {
        path: 'signup',
        component: LoginComponent,
        data: { title: 'Register' }
      },
      {
        path: 'forgot-password',
        component: LoginComponent,
        data: { title: 'Forgot Password' }
      },
      {
        path: 'reset-password',
        component: LoginComponent,
        data: { title: 'Reset Password' }
      }
    ], resolve: { access: HasTokenResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    MasterComponent
  ];

  static providers = [
    AuthService,
    HasTokenResolver
  ];
}

```

You've notice, we also attach some data to the routes under
```javascript
{
    path: 'reset-password',
    component: LoginComponent,
    data: { title: 'Reset Password' }
}
```
will discuss in the later steps

`Note: You can also declare a module inside the module, that was act as a child module.`

**Don't forget: we are using the custom paths(defined in tsconfig.json) for importing the files.**


### App Module

An Angular module class describes how the application parts fit together. Every application has at least one Angular module, 
the root module that you bootstrap to launch the application. You can call it anything you want. The conventional name is `AppModule`.

In this module, we will import

* Core Module
* Theme Module
* Routing file to lazy load all the modules
* Other dependencies as needed

By default, when application start AppModule is loaded, you can change this behave by updating the `main.js` file.

```javascript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@environment/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```
load the needed module in the `bootstrapModule(YourModule)` function 


### Core Module

The core module is a module that is only **imported once** in the `AppModule` and never again in the other modules. 
So we'll declare all dependencies in this module, that was need to load one time when application start.
To ensure your module is only imported one time, we have create a class `ensureModuleLoadedOnceGuard.ts`

`The reason behind this is that we want everything that's inside the core module to be a Singleton !!! And this is very important if you need your components/services to have only one instance. Some usage examples are the profiler/logger service/interceptor/http request service.`


### Shared Module

The SharedModule in contradiction with the CoreModule is imported in every feature module that needs some shared components.
It's recommended to avoid having services in the SharedModule because you will end up with a lot of instances of that service.

The `SharedModule` is the perfect place for importing and exporting back your `UI Modules` or `components` that are used a lot in your application. This will make your code more readable and maintainable, some good examples of the `SharedModule` use case are importing and exporting `Angular Material` modules and/or the `Flex Layout Module`. By doing this, you only have to import the `SharedModule` in your feature Module and voila !! All your imported Angular Material Modules/components are available and the import bloc on top of your file is much much smaller.

[Source](https://medium.com/@benmohamehdi/angular-best-practices-coremodule-vs-sharedmodule-25f6721aa2ef)


### Theme Module

In this module we will define the all the UI modules and Core application layout, that was purely based on the application theme.
Like

* Header
* Footer
* layout
* Etc file

There are two use cases of this modules

1. To Used as stand alone in any application module, if Not using SharedModule in all application Modules
2. If you're are importing SharedModule in each application module, you need to Import and Export `ThemeModule` in SharedModule, then automatically ThemeModule
    dependencies are available in other modules


### Layouts and Router Outlet

This acts as a placeholder that Angular dynamically fills based on the current router state.
In this boilerplate, we define a `master` layout(`MasterComponent`) in each module to load its components.

We will place `<router-outlet></router-outlet>` in each MasterComponent.
When Module routes gets active, Angular will automatically inject the component content in it.
If you want to perform middleware actions and related things,you can use `Guards` and `resolvers` in the module `routing` file. 
See `AuthModule` to check `resolver` example.

##### Application Startup Description

`AppModule` -> `CurrentRoutingModule` -> `SharedModule` -> `ThemeModule` -> `Application Layouts will be called`
So, theme module is loaded there, so we are free to use the layouts file.

We have used `ng-content` to inject layout files, in the `router-outlet` tag. So in the `MasterComponent` of each module, it will automatically add the current active routing component content.

For more details check the `ThemeModule` and `AuthModule`.



### Routing and Lazy Loading

For routing and lazy loading of modules, we have one routing file per application module, that was defined in the `app-routing.module.ts` file.
see example

```javascript
/**
 * @module AppRoutingModule
 * @description
 * Base routing module of the application.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Define the routes
const appRoutes: Routes = [
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```


## Guards and Protecting Routes

Angular route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route. 
They make this decision by looking for a true or false return value from a class which implements the given guard interface.


There are five different types of guards and each of them is called in a particular sequence.
The router's behavior is modified differently depending on which guard is used. The guards are:

* CanActivate
* CanActivateChild
* CanDeactivate
* CanLoad
* Resolve

We won't get too much into the details of each guard here but you can see the Angular docs for more.

You can [check](https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3) 
the article for better understanding of guards and use cases


## Resolvers
It allows you to get data before navigating to the new route. In this project, we have define three resolvers under 
`core/resolvers`

1. HasTokenResolver
2. AppRoutingAccess
3. AppCheckUserAlreadyLogin

`HasTokenResolver/AppCheckUserAlreadyLogin` -> If user is already login and visit non logged-in pages, Redirect to home page
`AppRoutingAccess` -> Prevent user from accessing, protected routes. If session is not valid, then redirect to login page.

You can customize this behavior, in case of design change. Like opening a popup and redirect back to normal url after login.
An [example](https://alligator.io/angular/route-resolvers/) how you can create a resolver.

## Http Interceptor

It is an `HttpInterceptor` interface. It was introduced with Angular 4.3 and provides a way to intercept and modify HTTP requests globally.
You can use them to set headers (JWT for example), redirect on error responses, and generally will help you avoid code duplication.

How it works:-

```

           -> Request -> Interceptor -> Request  -> 
Angular App                                       Backend
           <- Request <- Interceptor <- Response <-
```

[This Article](https://blog.angularindepth.com/top-10-ways-to-use-interceptors-in-angular-db450f8a62d6) has covered most of the use cases for Interceptor.

In our project we have created the following Interceptors

* api-prefix.interceptor
* error-handler.interceptor
* http.token.interceptor

##### api-prefix.interceptor
As its name implies, this interceptor is used to attach base url to each api request. You can modify it according to your need.
We are picking the base url from `environment` files from `host` key

##### error-handler.interceptor
This interceptor is used to handle the api error response. Like for example: if user token expired or authorized response is returned, you can send user back to login screen. After login we will redirect back to previous url.

##### http.token.interceptor
This interceptor is used to attach custom header to the api requests. You can change it according to needed

`Note: We already declared them in the providers in CoreModule, so that they are available globally in the application`.


## Services and API Calls

You can define services according to Modules. Please place one time loaded service in CoreModule and shareable service in SharedModule.

##### Api Class

We have created a common wrapper over HttpModule, to make `GET,POST,PUT,DELETE,PATCH` requests. Please check the `CommonHttpService` for usage

Sample Usage Example

```javascript
// Importing the service
import { CommonHttpService } from '@shared/services/common-http.service';

// Create an instance of service
private commonHttp: CommonHttpService

// Making a POST call
this.commonHttp.post<ApiResponseModel>('API URL', 'API params in the form of Objects')
```

Expected Server Response

```javascript
{
    success: Boolean; 
    message: String;
    data: any;
    errors: CommonBase;
}
```
* success -> True/False
* message -> Any message
* data -> Api related data
* errors -> An object representing the error message with {Key:Value} pair

We are expecting the above response is returned from the API call. 
If it is different, you can change the `ApiResponseModel` Class for mapping it


## Interface and Classes

You can create common/module dependent classes and interfaces for mapping the Payloads. You can find more about 
[here](https://ultimatecourses.com/blog/classes-vs-interfaces-in-typescript) in the article by [Todd Motto](https://ultimatecourses.com/author/toddmotto) a
Google Developer Expert