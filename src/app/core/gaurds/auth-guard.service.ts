import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';

import { JWTAuthService } from '../services/jwt-auth.service';

@Injectable()

export class AuthGuard implements CanActivate {

	constructor(private authService: JWTAuthService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;

		return this.checkLogin(url);
	}

	checkLogin(url: string): boolean {
		if (this.authService.IsAuthUser()) {
			return true;
		}
		this.router.navigate(['auth/login']);
		return false;
	}
}