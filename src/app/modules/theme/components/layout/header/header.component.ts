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
import { APP_USER } from '@configs/app-settings.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  router: string;
  user_dropdown: boolean = false;
  blogPage: any;
  appData: any;
  compayLogo = [];
  private _trialEndsAt;

  public _diff: number;
  public _days: number;
  public _hours: number;

  public _minutes: number;

  public _seconds: number;
  commingSoon = false;
  plan = "Free";
  image: any = '/assets/img/defaultuser.png';
  constructor(public loginService: JWTAuthService, private loader: LoaderService, public _router: Router,
    public userservice: UserService) {
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.user_dropdown = false;
  }

  ngOnInit() {
    this.loginService.getImage();
    this.loginService.image.subscribe((data) => {
      console.log(2323);
      this.image = data;
    });

  }

  capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase();
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
