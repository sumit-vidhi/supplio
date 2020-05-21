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
  years: Array<any> = [];
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService) {
    for (let i = 2020; i >= 1950; i--) {
      console.log(i);
      this.years.push(i);
    }
    console.log(this.years);
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      agency_name: ['', Validators.required],
      phone_code: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
      year_of_establishment: ['', Validators.required],
      company_size: ['', Validators.required],
      website: ['', Validators.required],
      owner_name: ['', Validators.required],
      designation: ['', Validators.required],

    });

  }



  get f() { return this.editForm.controls; }


  getEmail() {
    return this.loginService.getLoginUserEmail();
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

    const formdata = this.editForm.value;
    formdata.updateStatus = this.loginService.getUserStatus();
    formdata.userId = this.loginService.getLoginUserId();
    this.loader.startLoading();
    this.userService.editProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        this.loginService.setLoginUserDetail(result.record);
      }
    });

  }


}
