/**
 * Interceptor
 * This is ErrorHandlerInterceptor that adds a default error handler to all requests.
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UNAUTHORIZED, FORBIDDEN, NOT_FOUND } from 'http-status-codes';

import { LoggerService } from '@core/services/logger.service';
import { environment } from '@environment/environment';

/**
 * Creates a ErrorHandlerInterceptor.
 * @class ErrorHandlerInterceptor
 * @description
 *  This class is used to add error handler for all api requests
 */

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private logger: LoggerService,
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  /**
  * Customize the default error handler here if needed
  * @param {response} HttpEvent
  * @returns Http Response Object
  */
  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      this.logger.logError('Request error ' + JSON.stringify(response));
    }

     console.error(response);
    const httpErrorCode = response['status'];
    switch (httpErrorCode) {
      case UNAUTHORIZED:
        this.router.navigateByUrl('/users/login');
        break;
      case FORBIDDEN:
        this.router.navigateByUrl('/pages/403');
        break;
      case NOT_FOUND:
        this.router.navigateByUrl('/pages/404');
        break;
      default:
    }

    throw response;
  }

}

