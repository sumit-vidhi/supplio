/**
 * Creates a new LoggerService.
 * @class LoggerService
 * @description This is logger service, responsible for logging the messages.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  /**
   * @function log
   * @description
   * Log a given message
   * @param {msg} Message to log
   * @returns none
   */
  log(msg: string): void {
    console.log(msg);
  }

  /**
   * @function logError
   * @description
   * Log a given error message
   * @param {msg} Message to log
   * @returns none
   */
  logError(msg: string): void {
    console.error(msg);
  }
}
