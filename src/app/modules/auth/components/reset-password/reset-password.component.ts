import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { LoaderService } from '@core/services/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  message: any;
  status: any;
  data: any;
  userType:string="employer";
  constructor(private fb: FormBuilder,
    private authService: AuthService, private loader: LoaderService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [
        Validators.required
      ]]
    });
    if(localStorage.getItem("userType")){
      this.userType=localStorage.getItem("userType");
    }
  }

  onSubmit() {
    let formModel = this.forgotForm.value;
    this.loader.startLoading();
    this.authService.forgotPassword(formModel)
      .subscribe((result) => {
        this.loader.stopLoading();
        this.forgotForm.reset();
        if (result.status === 'success') {
          this.status = '';
          this.message = 'Reset password instructions has been sent to your email address. Please check your email';
        } else if (result.status === 'notActive') {
          this.status = 'notActive';
          this.data = result.record;
          this.message = "Your email address is inactive please check your inbox and activate account.";
        }
        else {
          this.status = '';
          this.message = 'We have no account for this email, Please try again with other email.';
        }
      });
  }
  resendEmail() {
    this.loader.startLoading();
    this.authService.resendEmail(this.data)
      .subscribe((result) => {
        this.loader.stopLoading();
        if (result.status === 'success') {
          this.status = '';
          this.message = "Your email address is inactive.Please check your inbox for the  activation email.Click the link in the emailso you may activate your email address.If you do not see tthe email in ypur inbox please check uyour Sapn or Junk Folder.";
        }
        else {
          this.status = '';
          this.message = 'We have no account for this email, Please try again with other email.';
        }
      });
  }



}
