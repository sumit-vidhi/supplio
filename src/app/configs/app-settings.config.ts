/**
 * @name appSettings
 * @description
 * This is config file, it include only global application related settings
 * Define Settings the object way(based on requirement):
 * @example {paramsName}:{value}
 * @constant appSettings
 * @type {CommonBase}
 */

import { CommonBase } from '@core/interfaces/common-base';

export const appSettings: CommonBase = {
  appTitle: 'Supplio - A Modern Manpower Solution',
  appLogo: '',
};

export const TOKEN_NAME = 'api_token'; // Local storage Key where user JWT token stored
export const TOKEN_HEADER_KEY = 'authorization'; // JWT token header name
// JWT token header name. It depends on your application, which header need to used. Modify it per needed.
export const AUTH_PREFIX = 'Bearer';
export const USER_STORAGE_KEY = 'user'; // Local storage Key name where login user detail stored
export const ROLE_KEY = 'roles'; //  Local storage Key name where login user roles stored, if any.
export const DM_PREFIX = 'A7B_APP_'; // Any prefix to use for local storage to make it unique
export const APP_USER = 'APP_USER'; // Local storage Key name where login user all detail stored
