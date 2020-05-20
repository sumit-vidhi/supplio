/**
 * Header component for Basic theme module
 */

import { Component, OnInit, HostListener } from '@angular/core';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { LoaderService } from '@core/services/loader-service';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router: string;
  user_dropdown: boolean = false;
  blogPage: any;

  private _trialEndsAt;

  public _diff: number;
  public _days: number;
  public _hours: number;

  public _minutes: number;

  public _seconds: number;
  commingSoon = false;
  image: any = '/assets/images/defaultProfile.jpg';
  constructor(public loginService: JWTAuthService, private loader: LoaderService, public _router: Router,
    public userservice: UserService) {
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.user_dropdown = false;
  }

  ngOnInit() {
    let plan = 'basic';
    this._trialEndsAt = "2020-02-15";

    interval(3000).pipe(map((x) => {
      this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
    })).subscribe((x) => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
      if (this._days <= 0 && this._hours <= 0 && this._minutes <= 0 && this._seconds <= 0) {
        this.commingSoon = true;
      }
    });

    if (this.loginService.getImage()) {
      this.image = this.loginService.getImage();

    }
    if (this.loginService.getUserAccessToken()) {
      plan = this.loginService.getPlan();
    }
    this.loader.blogData.subscribe((value) => {
      this.blogPage = value;
    });
  }

  openUserDropdown() {
    this.user_dropdown = !this.user_dropdown;
  }

  logout() {
    let plan = '';
  

  }





  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

}
