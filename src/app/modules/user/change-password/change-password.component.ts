import { Component, OnInit } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { Inject, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';

function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('confirm_password').value
    ? null : { 'mismatch': true };
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  regForm1: FormGroup;
  errormessage: any;
  sucessmessage: any;
  submitted = false;
  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService) { }

  ngOnInit() {
    this.regForm1 = this.fb.group({
      oldpassword: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      confirm_password: ['', Validators.required]
    }, {
      validator: passwordMatchValidator
    });
  }

  isFieldValid(form: string, field: string) {
    switch (form) {
      case 'regForm1': {
        return this.regForm1.get(field).invalid && (
          this.regForm1.get(field).dirty ||
          this.regForm1.get(field).touched);
      }

    }
  }

  changePassword(form: FormGroup) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    const formModal = {
      current_password: form.value.oldpassword,
      new_password: form.value.password,
      new_confirm_password: form.value.confirm_password
    }
    this.sucessmessage = "";
    this.errormessage = "";
    this.loader.startLoading();
    this.userService.changepassword(formModal)
      .subscribe((res: any) => {
        this.submitted = false;
        this.regForm1.reset();
        this.loader.stopLoading();
        if (res.payload.password) {
          this.errormessage = "";
          this.sucessmessage = res.message;
        }
        if (res.payload.error) {
          this.sucessmessage = "";
          this.errormessage = res.payload.error;
        }
      });
  }

}
