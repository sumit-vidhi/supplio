import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  message: any;
  referral: any;
  email: any;
  userName: any;
  firstName: any;
  lastName: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', [Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
      country: ['', Validators.required],

    });
    this.email = this.getEmail();
    this.userName = this.getUserName();
    this.firstName = this.getFirstName();
    this.lastName = this.getLastName();
    this.editForm.controls.firstName.setValue(this.firstName);
    this.editForm.controls.lastName.setValue(this.lastName);
    this.setStatus();
  }

  setStatus() {
    const status = this.loginService.getUserStatus();
    if (status === '1') {
      this.message = "";
      let formdata = {};
      this.userService.getProfile().subscribe((result) => {
        if (result.status === 'success') {
          delete result.record.id;
          delete result.record.user_id;
          result.record.firstName = this.getFirstName();
          result.record.lastName = this.getLastName();
          this.editForm.setValue(result.record);
        }
      })
      this.referral = this.getUrl();

    } else {
      this.message = "Your account is pending please update your profile";
    }
  }


  get f() { return this.editForm.controls; }


  getUrl() {

    const _isDev = window.location.port.indexOf('4200') > -1;

    const protocol = window.location.protocol;

    const host = window.location.host;

    return _isDev ? 'http://localhost:4200/auth/reg?code=' + this.getReferralCode() : protocol + "//" + host + '/auth/reg?code=' + this.getReferralCode();
  }

  getEmail() {
    return this.loginService.getLoginUserEmail();
  }

  getReferralCode() {
    return this.loginService.getRefferalCode();
  }

  getUserName() {
    return this.loginService.getLoginUserName();
  }
  getFirstName() {
    return this.loginService.getFirstUserName();
  }

  getLastName() {
    return this.loginService.getLastUserName();
  }


  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    if (this.loginService.getUserStatus() === '1') {
      const formdata = this.editForm.value;
      formdata.updateStatus = this.loginService.getUserStatus();
      formdata.userId = this.loginService.getLoginUserId();
      this.loader.startLoading();
      this.userService.editProfile(formdata).subscribe((result) => {
        this.loader.stopLoading();
        if (result.status === 'success') {
          result.record.authToken = result.record.accessToken;
          this.loginService.setLoginUserDetail(result.record);
          this.setStatus();
          alert("Profile Updated");
        }
      })
    } else {
      const formdata = this.editForm.value;
      formdata.updateStatus = this.loginService.getUserStatus();
      formdata.userId = this.loginService.getLoginUserId();
      this.loader.startLoading();
      this.userService.editProfile(formdata).subscribe((result) => {
        this.loader.stopLoading();
        if (result.status === 'success') {
          alert("You need to login after 24 hours so that your sponser get paid.");
          result.record.authToken = result.record.accessToken;
          this.loginService.setLoginUserDetail(result.record);
        }
      })
    }

  }


}
