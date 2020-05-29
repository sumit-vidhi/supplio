/**
 * Create a new instance of CommonHttpService
 * @class CommonHttpService
 * @description
 * This service define a wrapper over http requests GET,POST,PUT,PATCH,DELETE
 */

import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

import { ApiResponseModel } from '@shared/models/api-response-model';
import { MapModel } from '@shared/decorators/model-map';
import { CommonBase } from '@core/interfaces/common-base';
import { JWTAuthService } from './jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {


  constructor(
    private http: HttpClient,
    private loginService: JWTAuthService
  ) { }

  /**
   * @function get
   * @description
   * Constructs a GET request that interprets the body as a JSON object and returns the response body in a given type.
   * It will parse the the response and map it with {ApiResponseModel} to set common response format
   * @param  {string} url
   * @param  {CommonBase} [n]
   * @return {ApiResponseModel} Promise of type ApiResponseModel
   */
  get<T>(url: string, args: CommonBase = {}): Observable<T> {
    const params = new HttpParams(args);
    return this.http.get(url, { params: params })
      .pipe(
        map(data => {
          console.log(data, 'data');
          if (data['status'] == 'error') {
            this.loginService.deleteUserAccessToken(true);
          } else {
            return new MapModel(ApiResponseModel).map(data);
          }
        })
      );
  }


  /**
   * @function post
   * @description
   * Constructs a wrapper over POST request that interprets the body as a JSON object and returns an observable of the response.
   * It will parse the the response and map it with {ApiResponseModel} to set common response format
   * @param  {string} url
   * @param  {CommonBase} [n]
   * @return {ApiResponseModel} Promise of type ApiResponseModel
   */
  post<T>(url: string, params, headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache', // Disable IE cache
    'Pragma': 'no-cache', // Disable IE cache
  })): Observable<any> {
console.log(headers)
    return this.http.post(url, params, { headers: headers });
  }

  /**
   * @function put
   * @description
   * Constructs a wrapper over PUT request that interprets the body as a JSON object and returns an observable of the response.
   * It will parse the the response and map it with {ApiResponseModel} to set common response format
   * @param  {string} url
   * @param {CommonBase} n
   * @return {ApiResponseModel} Promise of type ApiResponseModel
   */
  put<T>(url: string, args: CommonBase = {}): Observable<T> {
    const params = new HttpParams(args);
    return this.http.put<ApiResponseModel>(url, params)
      .pipe(
        map(data => {
          return new MapModel(ApiResponseModel).map(data);
        })
      );
  }


  /**
   * @function delete
   * @description
   * Constructs a wrapper over DELETE request and returns the response in a given type.
   * It will parse the the response and map it with {ApiResponseModel} to set common response format
   * @param  {string} url
   * @return {ApiResponseModel} Promise of type ApiResponseModel
   */
  delete<T>(url: string): Observable<T> {
    return this.http.delete<any>(url);
  }
}
