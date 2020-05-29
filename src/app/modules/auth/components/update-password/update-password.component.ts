import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Router,
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { LoaderService } from '@core/services/loader-service';

function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('confirm_password').value
    ? null : { 'mismatch': true };
}

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService,
    private route: ActivatedRoute,
  ) { }

  isValidReset: boolean;
  resetForm: FormGroup;
  dismissible = true;
  message: any;
  token: any;
  submitted = false;
  error: string = "";
  userType: string;
  ngOnInit() {

    this.createForm();
    this.route.paramMap.subscribe(params => {
      this.token = params.get("id");
    })
    if (localStorage.getItem('userType')) {
      this.userType = localStorage.getItem('userType');
    } else {
      this.userType = "employer";
    }
  }
  get f() { return this.resetForm.controls; }

  createForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      validator: passwordMatchValidator
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    let formModel = this.resetForm.value;
    formModel.token = this.token;
    this.loader.startLoading();
    this.authService.reset(formModel)
      .subscribe((res: any) => {
        this.submitted = false;
        this.loader.stopLoading();
        this.resetForm.reset();
        if (res.payload.error) {
          this.error = res.payload.error;
        } else {
          this.message = res.message;
        }
      })
  }
}
