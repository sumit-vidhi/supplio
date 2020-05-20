/**
 * @resolver
 * @description
 * Define all the application level resolvers
 */

import { Injectable } from '@angular/core';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class HasTokenResolver {
  constructor(
    private authService: JWTAuthService,
    private router: Router
  ) { }
  resolve(): any {
    if (this.authService.IsAuthUser()) {
      this.router.navigate(["/user"]);
    }
  }
}

@Injectable()
export class AppRoutingAccess {
  constructor(
    private authService: JWTAuthService,
    private router: Router
  ) { }
  resolve(): any {
    if (!this.authService.IsAuthUser()) {
      this.router.navigate(["auth/login"]);
    }
  }
}

@Injectable()
export class AppCheckUserAlreadyLogin {
  constructor(
    private authService: JWTAuthService,
    private router: Router
  ) { }
  resolve(): any {
    if (this.authService.IsAuthUser()) {
      this.router.navigate(["user"]);
    }
  }
}
