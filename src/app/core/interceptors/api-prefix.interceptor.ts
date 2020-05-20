/**
 * Interceptor
 * This is ApiPrefixInterceptor, responsible for prefixes all requests with `environment.host`.
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';

/**
 * Creates a ApiPrefixInterceptor.
 * @class
 * @name ApiPrefixInterceptor
 * @description
 * This class is used to add Base url to each api request
 * It use the configuration variable `environment.host` from environment file
 */

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ url: environment.host + request.url });
    return next.handle(request);
  }

}
