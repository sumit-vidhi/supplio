/**
 * Login component for auth module
 */

import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { LoaderService } from '@core/services/loader-service';
import { UserService } from '@modules/user/services/user.service';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userType: string;
  error: string = '';
  message: string = "";
  constructor(private fb: FormBuilder, private authService: AuthService, private userservice: UserService,
    private loginService: JWTAuthService, private loader: LoaderService, private route: ActivatedRoute, private router: Router, private renderer: Renderer2) { }

  ngOnInit() {

    this.renderer.removeClass(document.body, 'body-bg');
    this.renderer.removeClass(document.body, 'kt-page--loading-enabled');
    this.renderer.removeClass(document.body, 'kt-quick-panel--right');
    this.renderer.removeClass(document.body, 'kt-demo-panel--right');
    this.renderer.removeClass(document.body, 'kt-offcanvas-panel--right');
    this.renderer.removeClass(document.body, 'kt-header--fixed');
    this.renderer.removeClass(document.body, 'kt-header--minimize-menu');
    this.renderer.removeClass(document.body, 'kt-header--minimize-menu');
    this.renderer.removeClass(document.body, 'kt-header-mobile--fixed');
    this.renderer.removeClass(document.body, 'kt-subheader--enabled');
    this.renderer.removeClass(document.body, 'kt-subheader--transparent');
    this.userservice.siteSetting().subscribe((result: any) => {
      if (result.payload.settings) {
        console.log(232323);
        window.localStorage.setItem("setting", JSON.stringify(result.payload.settings))
      }
    })
    this.message = "";
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
    this.route.paramMap.subscribe(params => {

      const userType = params.get("user");
      if (userType == "employer" || userType == "agency") {
        this.userType = userType;
        console.log(this.userType);
        localStorage.setItem("userType", userType);
        if (params.get("verified")) {
          console.log("23232");
          this.message = "Your email address has been verified successfully. Please login into your account for more detail.";
        }
      } else {
        console.log(userType);
        this.router.navigateByUrl('/auth/login/employer');
      }
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.error = "";
    let formModal = this.loginForm.value;
    this.loader.startLoading();
    this.authService.login(formModal).subscribe((result: any) => {

      if (result.payload.token) {
        result.payload.user["authToken"] = result.payload.token;
        this.loginService.setLoginUserDetail(result.payload.user);
      } else if (result.payload.error) {
        this.error = result.payload.error;
      } else {
        alert("Email and password is wrong");
      }
      this.loader.stopLoading();
    });

  }

}
