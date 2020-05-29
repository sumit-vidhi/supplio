/**
 * Interceptor
 * This is HttpTokenInterceptor that adds a token to each api request.
 */


import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JWTAuthService } from '@core/services/jwt-auth.service';
import { TOKEN_HEADER_KEY, AUTH_PREFIX } from '@configs/app-settings.config';

import { CommonBase } from "@core/interfaces/common-base";

/**
 * Creates a HttpTokenInterceptor.
 * @class HttpTokenInterceptor
 * @classdesc This class is used to add user token/auth entity to the headers.
 * You can define the custom header here.
 */

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private authService: JWTAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headersConfig: CommonBase = {};
    if (req.headers.get('no-auth') != "true") {
      headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache', // Disable IE cache
        'Pragma': 'no-cache', // Disable IE cache
      };
    } else {
      headersConfig = {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      };
    }
    console.log(headersConfig);




    const token: null | CommonBase = this.authService.getUserAccessToken();
    if (token) {
      headersConfig[TOKEN_HEADER_KEY] = `Bearer ${token}`;
    }
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}

