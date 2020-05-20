/**
 * Constants
 * This is development config file for environment, it is used to declare development environment related configurations
 * Define Settings the object way(based on requirement):
 * {paramsName}:{value}
 * @note
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build --prod --configuration=test` replaces `environment.ts` with `environment.test.ts`.
 * The list of file replacements can be found in `angular.json`.
 */

export const environment = {
  production: true,
  env: 'prod',
  host: 'https://api.guaranteedownlineclub.com/' // Add the api url here with slash at the end
};
