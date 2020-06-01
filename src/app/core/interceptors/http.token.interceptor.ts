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
    let headersConfig = {};
    if (req.body instanceof FormData) {
      headersConfig = {
        'ContentType': 'multipart/form-data',
      };
    } else {
      headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache', // Disable IE cache
        'Pragma': 'no-cache', // Disable IE cache
      };
    }
    console.log(headersConfig);




    const token = this.authService.getUserAccessToken() || null;
    if (token) {
      headersConfig[TOKEN_HEADER_KEY] = `Bearer ${token}`;
    }
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}

