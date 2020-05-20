/**
 0* Creating a new instance of JWTAuthService
 * @class JWTAuthService
 * @description
 * This 0is auth service, responsible for managing the Authentication related task.
 */

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';

import { APP_USER } from '@configs/app-settings.config';
import { CommonBase } from '@core/interfaces/common-base';


@Injectable({
  providedIn: "root"
})
export class JWTAuthService {
  constructor(
    private router: Router
  ) { }


  /**
   * @function logout
   * @description
   * Check current login user token exists
   * @returns {Observable<any>}
   */
  logout(): Observable<boolean> {
    this.deleteUserAccessToken();
    return observableOf(true);
  }

  /**
   * @function getUserInfo
   * @description
   * Check current login user token exists
   * @returns {Observable<any>}
   */
  getUserInfo(): Observable<any> {
    const savedCredentials = this.getLoginUser();
    return observableOf(savedCredentials);
  }

  /**
   * @function IsAuthUser
   * @description
   * Check current login user token exists
   * @returns {boolean}
   */
  IsAuthUser(): boolean {
    if (window.localStorage[APP_USER] && JSON.parse(window.localStorage[APP_USER]).authToken) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * @function setLoginUserDetail
  * @description
  * Set login user details in local storage
  * @param {obj} {CommonBase}
  * @returns none
  */
  setLoginUserDetail(obj: CommonBase): void {
    window.localStorage[APP_USER] = JSON.stringify(obj);
    if (JSON.parse(window.localStorage[APP_USER]).updateStatus == "1") {
      this.router.navigate(["user"]);
    } else {
      this.router.navigate(['user/edit-profile']);
    }

  }

  /**
  * @function
  * @description Set login user details in local storage
  * @param {data} CommonBase
  * @returns none
  */
  updateLoginUserDetail(data: CommonBase): void {
    if (window.localStorage[APP_USER]) {
      const authObject = JSON.parse(window.localStorage[APP_USER]);
      // Update the user details here
      window.localStorage[APP_USER] = JSON.stringify(authObject);
    }
  }

  /**
   * @function getUserAccessToken
   * @description
   * Get user access token
   * @returns null | CommonBase
  */
  getUserAccessToken(): null | CommonBase {
    if (this.IsAuthUser()) {
      return JSON.parse(window.localStorage[APP_USER]).authToken;
    } else {
      return null;
    }
  }

  /**
  * @function deleteUserAccessToken
  * @param {redirect} boolean
  * @description
  * Delete user access token
  * @returns {void}
  */
  deleteUserAccessToken(redirect: boolean = true): void {
    window.localStorage.clear();
    console.log(redirect);
    if (redirect === true) {
      this.router.navigate(["auth/login"]);
      // window.location.reload();
    }
  }

  /**
  * @function getLoginUserId
  * @description
  * Get login user id
  * @returns {CommonBase}
  */
  getLoginUserId(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).userId;
    }
  }

  /**
 * @function getLoginUserId
 * @description
 * Get login user id
 * @returns {CommonBase}
 */
  getSponserUserId(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).parentId;
    }
  }

  /**
  * @function getLoginUserId
  * @description
  * Get login user id
  * @returns {CommonBase}
  */
  getmmeUrl(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).mmeUrl;
    }
  }

  /**
  * @function getLoginUserId
  * @description
  * Get login user id
  * @returns {CommonBase}
  */
  getfreeUrl(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).freeUrl;
    }
  }

  /**
  * @function getLoginUserId
  * @description
  * Get login user id
  * @returns {CommonBase}
  */
  getPlan() {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).type;
    }
  }

  /**
  * @function getLoginUserEmail
  * @description
  * Get login user email
  * @returns {CommonBase}
  */
  getLoginUserEmail(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).email;
    }
  }
  getRefferalCode(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).referralCode;
    }
  }

  /**
  * @function getLoginUserEmail
  * @description
  * Get login user email
  * @returns {CommonBase}
  */
  getLoginUserName(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).userName;
    }
  }

  /**
  * @function getLoginUserEmail
  * @description
  * Get login user email
  * @returns {CommonBase}
  */
  getFirstUserName(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).firstName;
    }
  }

  /**
 * @function getLoginUserEmail
 * @description
 * Get login user email
 * @returns {CommonBase}
 */
  getImage(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).image;
    }
  }


  getcreatedDate() {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).createdDate;
    }
  }
  /**
    * @function getLoginUserEmail
    * @description
    * Get login user email
    * @returns {CommonBase}
    */
  getLastUserName(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).lastName;
    }
  }
  /**
 * @function getLoginUserEmail
 * @description
 * Get login user email
 * @returns {CommonBase}
 */
  getUserStatus() {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).updateStatus;
    }
  }

  /**
  * @function getLoginUserNameLetter
  * @description
  * Get login user name first letter
  * @returns {CommonBase}
  */
  getLoginUserNameLetter(): CommonBase {
    if (window.localStorage[APP_USER]) {
      return JSON.parse(window.localStorage[APP_USER]).Name.substring(0, 1);
    }
  }

  /**
  * @function getLoginUser
  * @description
  * Get login user details from local storage
  * @returns {CommonBase}
  */
  private getLoginUser(): CommonBase {
    const savedCredentials = localStorage.getItem(APP_USER);
    return JSON.parse(savedCredentials);
  }

}
