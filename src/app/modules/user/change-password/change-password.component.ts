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
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
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
    const formModal = form.value;
    this.sucessmessage = "";
    this.errormessage = "";
    this.loader.startLoading();
    this.userService.changepassword(formModal)
      .subscribe((res) => {
        this.regForm1.reset();
        this.loader.stopLoading();
        if (res.status === 'success') {
          this.errormessage = "";
          this.sucessmessage = "Password changed successfully";
          alert("Password changed successfully");

        } else {
          this.sucessmessage = "";
          this.errormessage = "Old Password is wrong .";
          alert("Old Password is wrong .");
        }
      });
  }

}
