import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
// custom validator to check that two fields match
function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}



@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    referralName: any = 'NA';
    referralId: any;
    referralEmail: any;
    userType: string;
    message: string = '';
    error: string = "";
    constructor(private formBuilder: FormBuilder, private authService: AuthService,
        private router: Router, private loader: LoaderService,
        private route: ActivatedRoute, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.removeClass(document.body, 'demo');
        const restitData: any = JSON.parse(window.localStorage.getItem("setting"));

        const domainArray = restitData.employer_restricted_domains.split(',');
        console.log(domainArray);
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            agency_name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email], this.isEmailUnique.bind(this)],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirm_password: ['', Validators.required]
        }, {
            validator: [MustMatch('password', 'confirm_password')]
        });
        this.route.paramMap.subscribe(params => {
            const userType = params.get("user");
            if (userType == "employer" || userType == "agency") {
                this.userType = userType;
                localStorage.setItem("userType", userType);
            } else {
                this.router.navigateByUrl('/pages/403');
            }
        })

    }


    isUernameUnique(control: FormControl) {
        const q = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.authService.checkEmailToken({ email: control.value }).subscribe((res) => {
                    if (res.status == 'error') {
                        resolve({ 'isUernameUnique': true });
                    } else {
                        resolve(null);
                    }
                })
            }, 1000);
        });
        return q;
    }

    isEmailUnique(control: FormControl) {
        const q = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.authService.checkEmailToken({ email: control.value }).subscribe((res) => {

                    if (res.message == 'Error') {
                        console.log(res);
                        resolve({ 'isEmailUnique': true });
                    } else {
                        resolve(null);
                    }
                })
            }, 1000);
        });
        return q;
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    get accept() {
        return this.registerForm.get('accept');
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.registerForm);
        if (this.registerForm.invalid) {
            return;
        }
        this.message = '';
        this.error = '';
        const formData = this.registerForm.value;
        if (this.userType == "employer") {
            const restitData: any = JSON.parse(window.localStorage.getItem("setting"));

            const domainArray = restitData.employer_restricted_domains.split(',');
            console.log(domainArray);
            for (let index = 0; index < domainArray.length; index++) {
                if (formData.email.indexOf(domainArray[index]) > -1) {
                    this.error = 'Please enter your company  email address.';
                    return;
                }

            }


        }
        formData.role = this.capitalize(this.userType);
        this.loader.startLoading();
        this.authService.register(formData).subscribe((result: any) => {
            this.loader.stopLoading();
            if (result.payload.message) {
                this.router.navigate(['auth/thankyou']);
            } else if (result.payload.error) {
                this.error = result.payload.error;
            }
        })
    }

    capitalize(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

}
