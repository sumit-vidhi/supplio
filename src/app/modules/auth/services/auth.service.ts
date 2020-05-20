/**
 * Creating a new instance of AuthService
 * @class AuthService
 * @description
 * This is auth service, responsible for managing the Authentication related task.
 */

import { Injectable } from '@angular/core';
import { CommonHttpService } from '@core/services/common-http.service';
import { appApiUrl } from "@configs/app-api-urls.config";
import { ToggleNu } from "@shared/enum/toggle";
import { ApiResponseModel } from '@shared/models/api-response-model';
import { Observable } from 'rxjs';

interface UserLogin {
  email: string;
  password: string;
  remember_me?: ToggleNu;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private commonHttp: CommonHttpService
  ) { }

  
  login(param: UserLogin): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.login, param);
  }
  
  register(formData): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.register, formData);
  }

  confirm(token): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.emailVerification, token);
  }

  forgotPassword(token): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.forgotPassword, token);
  }
  checkEmailToken(email) {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.emailCheck, email);
  }
  
  confirmToken(token): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.confirmToken, token);
  }

  reset(token): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.resetPassword, token);
  }

  getReferral(code): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.getRefferal, code);
  }  
  resendEmail(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.resendEmail, data);
  }
}
