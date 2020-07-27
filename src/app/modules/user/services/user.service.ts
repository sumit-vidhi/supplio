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
import { BehaviorSubject } from 'rxjs';

interface UserLogin {
  email: string;
  password: string;
  remember_me?: ToggleNu;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public wallet = new BehaviorSubject<any>(null);
  constructor(
    private commonHttp: CommonHttpService
  ) { }


  editProfile(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.editProfile, data);
  }
  addWallet(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.addWallet, data);
  }
  addsubscription(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.addsubscription, data);
  }
  agencyeditProfile(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.agencyeditProfile, data);
  }
  addReview(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.addReview, data);
  }
  addComplete(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.addComplete, data);
  }

  getProfile(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getdata);
  }
  documentList(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.documentList);
  }
  getPcl(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getPcl);
  }
  getPsl(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getPsl);
  }
  genrateDocument(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.genrateDocument + "?id=" + id);
  }
  hire(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.hireAgency + "?id=" + id);
  }
  getProfiledata(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.agencyProfile + "?id=" + id);
  }
  getAllPlan(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getPlan);
  }

  getWallet(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getWallet);
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
  saveBid(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.addbid, data);
  }
  getSubcategoies(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getSubcategory);
  }
  getAllSubcategoies(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getAllSubcategory);
  }
  createCopyDemand(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>(appApiUrl.auth.duplicate, data);
  }
  siteSetting(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.setting);
  }
  filedelete(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.delete + "?id=" + id);
  }
  fileAgencydelete(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.agencydelete + "?id=" + id);
  }
  fileteamdelete(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.teamdelete + "?id=" + id);
  }
  imageUpload(data): Observable<ApiResponseModel> {
    return this.commonHttp.post<ApiResponseModel>('fileTest', data);
  }
  demandList(data): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.demandList + "?page=" + data.page + "&hire_type=" + data.hire_type + "&hire_country=" + data.hire_country + "&demand_type=" + data.demand_type + "&status=" + data.status + "&start_date=" + data.startDate + "&end_date=" + data.postDate);
  }
  demandAllList(data): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.demandAllList + "?page=" + data.page + "&hire_type=" + data.hire_type + "&hire_country=" + data.hire_country + "&demand_type=" + data.demand_type + "&status=" + data.status + "&start_date=" + data.startDate + "&end_date=" + data.postDate);
  }
  getDashboardData(): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getDashboardData);
  }
  getDemand(id): Observable<ApiResponseModel> {
    return this.commonHttp.get<ApiResponseModel>(appApiUrl.auth.getDemand + "?id=" + id);
  }


}
