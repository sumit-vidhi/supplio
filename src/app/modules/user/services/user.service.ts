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
  checkDemand(): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.creatDemand, '');
  }
  createDemand(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.updateDemand, data);
  }
  getSubcategoies(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getSubcategory);
  }
  siteSetting(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.setting);
  }

  imageUpload(data, headers): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.editProfile, data, headers);
  }
  demandList(data): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.demandList + "?hire_type=" + data.hire_type + "&hire_country=" + data.hire_country + "&demand_type=" + data.demand_type + "&status=" + data.status + "&start_date=" + data.startDate + "&end_date=" + data.postDate);
  }
  demandAllList(data): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.demandAllList + "?hire_type=" + data.hire_type + "&hire_country=" + data.hire_country + "&demand_type=" + data.demand_type + "&status=" + data.status + "&start_date=" + data.startDate + "&end_date=" + data.postDate);
  }
  getDemand(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getDemand + "?id=" + id);
  }


}
