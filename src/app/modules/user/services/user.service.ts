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
export class UserService {

  constructor(
    private commonHttp: CommonHttpService
  ) { }


  editProfile(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.editProfile, data);
  }
  getProfile(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getdata);
  }

  getdashboardData(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getdashboradData);
  }

  changepassword(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.updatePassword, data);
  }

 
  imageUpload(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.imageUpload, data);
  }


}
