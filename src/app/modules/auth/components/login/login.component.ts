/**
 * Login component for auth module
 */

import { Component, OnInit } from '@angular/core';
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
  constructor(private fb: FormBuilder, private authService: AuthService, private userservice: UserService,
    private loginService: JWTAuthService, private loader: LoaderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
    this.route.paramMap.subscribe(params => {
      const userType = params.get("user");
      if (userType == "employer" || userType == "agency") {
        this.userType = userType;
        localStorage.setItem("userType", userType);
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
    let formModal = this.loginForm.value;
    this.loader.startLoading();
    this.authService.login(formModal).subscribe(result => {
      this.loader.stopLoading();
      if (result.status === 'success') {
        result.record.authToken = result.record.accessToken;
        this.loginService.setLoginUserDetail(result.record);
        this.blogData();
      } else if (result.status === 'notActive') {
        alert("Your email address is inactive. Please check your inbox and activate account.");
      } else {
        alert("Email and password is wrong");
      }
    });

  }

  blogData() {
    let plan = 'everyone';
    if (this.loginService.getUserAccessToken()) {
      plan = this.loginService.getPlan();
    }
    this.userservice.getBlogPage({ plan: plan }).subscribe((result) => {
      this.loader.addblog(result.record);
    })
  }
}
