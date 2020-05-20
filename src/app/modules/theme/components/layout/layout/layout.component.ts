/**
 * layout component for Basic theme module
 */

import { Component, OnInit } from '@angular/core';

import { JWTAuthService } from '@core/services/jwt-auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isUserLogin: boolean;
  constructor(private authService: JWTAuthService) { }

  ngOnInit() {
    this.isUserLogin = this.authService.IsAuthUser();
  }

}
