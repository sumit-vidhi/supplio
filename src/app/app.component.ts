/**
 * Component
 * This is the entry component of the application.
 * On application startup, this component is loaded
 */

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { appSettings } from '@configs/app-settings.config';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { JWTAuthService } from './core/services/jwt-auth.service';

import { SearchCountryField } from 'ngx-intl-tel-input';
import { TooltipLabel } from 'ngx-intl-tel-input';
import { CountryISO } from 'ngx-intl-tel-input';
interface User {
  userId: number;
  id: number;
  first_name: string;
  last_name: string;
}

interface LoginPayload {
  email: string;
  password: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = appSettings.appTitle;
  logo = appSettings.appLogo;


  constructor(private authService: AuthService, private loginService: JWTAuthService, private router: Router, private bnIdle: BnNgIdleService) {
    this.bnIdle.startWatching(1800).subscribe((res) => {
      if (res) {
        this.loginService.logout();
      }
    })
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

  }
}
