// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod --configuration=test` replaces `environment.ts` with `environment.test.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  env: 'test',
  host: 'http://localhost:8080/api/v1/' // Add the api url here with slash at the end
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
