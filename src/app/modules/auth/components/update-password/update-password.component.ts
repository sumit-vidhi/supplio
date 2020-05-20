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

  createForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      validator: passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }
    let formModel = this.resetForm.value;
    formModel.token = this.token;
    this.loader.startLoading();
    this.authService.reset(formModel)
      .subscribe((res) => {
        this.resetForm.reset();
        if (res.status === 'success') {
          this.loader.stopLoading();
          this.message = 'Your password has reset successfully';
        } else {
          this.message = 'Internal Server Error. Please try again';
        }
      })
  }

  ngOnInit() {

    this.isValidReset = false;
    this.createForm();
    this.loader.startLoading();
    this.route.params.subscribe(params => {
      this.token = params.code;
      this.authService.confirmToken({
        id: params.id,
        token: params.code
      })
        .subscribe((response: any) => {
          this.loader.stopLoading();
          if (response.status == 'success') {
            this.isValidReset = true
          }
        })
    })
  }
}
