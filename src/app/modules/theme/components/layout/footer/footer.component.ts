/**
 * Footer component for Basic theme module
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWTAuthService } from '@core/services/jwt-auth.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  siteTitle: any;
  constructor(public _router: Router, public loginService: JWTAuthService) { }

  ngOnInit() {
    const settingData: any = JSON.parse(window.localStorage.getItem("setting"));
    this.siteTitle = settingData.site_title;
  }
}
