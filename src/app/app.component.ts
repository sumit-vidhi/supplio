/**
 * Component
 * This is the entry component of the application.
 * On application startup, this component is loaded
 */

import { Component, OnInit, Renderer2 } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { appSettings } from '@configs/app-settings.config';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { JWTAuthService } from './core/services/jwt-auth.service';
import { UserService } from './modules/user/services/user.service';

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
  separateDialCode = true;
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });

  constructor(private authService: AuthService, private userService: UserService, private loginService: JWTAuthService, private router: Router, private bnIdle: BnNgIdleService, private renderer: Renderer2) {
    this.bnIdle.startWatching(1800).subscribe((res) => {
      if (res) {
        this.loginService.logout();
      }
    })
  }

  ngOnInit() {
    if (this.loginService.IsAuthUser()) {
      this.renderer.addClass(document.body, 'demo');
    }
    if (!this.loginService.IsAuthUser()) {
      this.renderer.removeClass(document.body, 'demo');
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.userService.siteSetting().subscribe((result: any) => {
      if (result.payload.settings) {
        console.log(232323);
        window.localStorage.setItem("setting", JSON.stringify(result.payload.settings))
      }
    })
  }
}
