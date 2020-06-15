/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { ElementRef, NgZone } from '@angular/core';
import { APP_USER } from '@configs/app-settings.config';
import { SearchCountryField } from 'projects/ngx-intl-tel-input/src/lib/enums/search-country-field.enum';
import { TooltipLabel } from 'projects/ngx-intl-tel-input/src/lib/enums/tooltip-label.enum';
import { CountryISO } from 'projects/ngx-intl-tel-input/src/lib/enums/country-iso.enum';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  address: Object;
  establishmentAddress: Object;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  formattedAddress: string;
  formattedEstablishmentAddress: string;
  modalReference: NgbModalRef;
  phone: string;
  editForm: FormGroup;
  aboutForm: FormGroup;
  submitted = false;
  locationSubmitted = false;
  message: any;
  referral: any;
  email: any;
  userName: any;
  firstName: any;
  lastName: any;
  years: Array<number> = [];
  minTab = 1; //Minimum Tab Step
  maxTab = 5; //Maximum Tab Step
  phoneForm: FormGroup;
  activeTab = this.minTab;
  disabledTabs: any = [2, 3, 4, 5];
  appData: any;
  locationForm: FormGroup;
  ckeConfig: any;
  countryCode = "IN";
  @ViewChild('searchElement', { static: false }) searchElement: ElementRef;
  @ViewChild('myckeditor', { static: false }) ckeditor: any;
  confirmMessage: any;
  imageForm: FormGroup;
  filedata: any;
  fileIdentity: any;
  filelogo: any;
  imageSubmitted = false;
  image: any;
  imageName: any;
  headQuater: any = 0;
  @ViewChild('labelImport', { static: false }) labelImport: ElementRef;
  @ViewChild('labelidentityImport', { static: false }) labelidentityImport: ElementRef;
  @ViewChild('labellogImport', { static: false }) labellogImport: ElementRef;
  iconList = [ // array of icon class list based on type
    { type: "xlsx", icon: "fa fa-file-excel-o" },
    { type: "pdf", icon: "fa fa-file-pdf-o" },
    { type: "jpg", icon: "fa fa-file-image-o" },
    { type: "png", icon: "fa fa-file-image-o" }
  ];

  getFileExtension(filename) { // this will give you icon class name
    //console.log(filename);
    if (filename) {
      let ext = filename.split(".").pop();
      let obj = this.iconList.filter(row => {
        if (row.type === ext) {
          return true;
        }
      });
      if (obj.length > 0) {
        let icon = obj[0].icon;
        return icon;
      } else {
        return "";
      }
    }

  }
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public zone: NgZone,
    public modalService: NgbModal,
    private router: Router,
    private loader: LoaderService,
    public loginService: JWTAuthService,
    private ngZone: NgZone,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    for (let i = 2020; i >= 1950; i--) {
      this.years.push(i);
    }
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      removePlugins: 'horizontalrule,tabletools,specialchar,about,list,others',
      removeButtons:
        'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Cut,Copy,Paste,Table,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent',
    };
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      agency_name: ['', Validators.required],
      phone_code: ['IN', Validators.required],
      phone_number: [
        '',
        [Validators.required],
      ],
      year_of_establishment: ['', Validators.required],
      company_size: ['', Validators.required],
      website: ['', Validators.required],
      owner_name: ['', Validators.required],
      designation: ['', Validators.required],
    });
    this.imageForm = this.formBuilder.group({
      myFile: ['', Validators.required],
      identity: ['', Validators.required],
      logo: ['', Validators.required]
    })
    const locationForm = this.formBuilder.group({
      location: this.formBuilder.array([]),

    });
    this.aboutForm = this.formBuilder.group({
      about_company: [''],
    });
    const arrayControl = <FormArray>locationForm.controls['location'];
    let newGroup = this.formBuilder.group({
      address: ['', [Validators.required]],
      orders: [0],
    });
    arrayControl.push(newGroup);
    this.locationForm = locationForm;
    this.appData = JSON.parse(window.localStorage[APP_USER]);
    if (this.appData.last_step_updated) {
      this.disabledTabs = this.disabledTabs.slice(this.appData.last_step_updated);
      console.log(this.disabledTabs);
    }
    this.image = {
      trade_license: "",
      proof_of_identity: "",
      company_logo: ""
    };
    this.imageName = {
      trade_license: "",
      proof_of_identity: "",
      company_logo: ""
    };
    if (this.appData.files && this.appData.files.length) {
      for (let i = 0; i < this.appData.files.length; i++) {
        if (this.appData.files[i].file_key == "trade_license") {
          this.image.trade_license = this.appData.files[i].filepath;
          this.imageName.trade_license = this.appData.files[i].filename;
          this.imageForm.patchValue({
            myFile: this.image.trade_license
          });
        }
        if (this.appData.files[i].file_key == "proof_of_identity") {
          this.image.proof_of_identity = this.appData.files[i].filepath;
          this.imageName.proof_of_identity = this.appData.files[i].filename;
          this.imageForm.patchValue({
            identity: this.image.proof_of_identity
          });
        }
        if (this.appData.files[i].file_key == "company_logo") {
          this.image.company_logo = this.appData.files[i].filepath;
          this.imageName.company_logo = this.appData.files[i].filename;
          this.imageForm.patchValue({
            logo: this.image.company_logo
          });
        }
        console.log(this.imageForm.value);
      }

    }
    console.log(this.image);
    if (this.appData.phone_number) {

      this.setFormdata();
      this.setLocation(locationForm, arrayControl);
    }
    this.phoneForm = this.formBuilder.group({
      phone: [''],
    });
  }

  deleteImage(name, image) {
    this.image[name] = "";
    this.imageForm.controls[image].setValue("");
    this.imageForm.controls[image].updateValueAndValidity();
  }

  setLocation(locationForm, newGroup) {

    const location = this.appData.users_locations.map((value, index) => {
      return this.appData.users_locations[index].address;
    });
    if (location.length) {
      const headQauter = this.appData.users_locations.findIndex((data) => data.headquaters == 1)
      let groupArr = [];

      for (let i = 0; i < location.length; i++) {
        groupArr.push(
          this.formBuilder.group({ address: [location[i], Validators.required], orders: [headQauter] })
        );
      }

      this.locationForm.setControl('location', this.formBuilder.array(groupArr));
    }

    //  console.log(this.locationForm.get('location')['controls'][0].value.address);
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
    this.labelImport.nativeElement.innerText = this.filedata.name;
    this.imageForm.get('myFile').setValue(this.filedata);
  }
  fileIdentityEvent(e) {
    this.fileIdentity = e.target.files[0];
    this.labelidentityImport.nativeElement.innerText = this.fileIdentity.name;
    this.imageForm.get('identity').setValue(this.fileIdentity);
    // console.log(this.filedata);
  }
  fileLogoEvent(e) {
    this.filelogo = e.target.files[0];
    this.labellogImport.nativeElement.innerText = this.filelogo.name;
    this.imageForm.get('logo').setValue(this.filelogo);
    //console.log(this.filedata);
  }
  setFormdata() {
    var data = {
      agency_name: this.appData.agency_name,
      company_size: this.appData.company_size,
      designation: this.appData.designation,
      owner_name: this.appData.owner_name,
      phone_code: this.appData.phone_code || '+91',
      phone_number: this.appData.phone_number,
      website: this.appData.website,
      year_of_establishment: this.appData.year_of_establishment
        ? Number(this.appData.year_of_establishment)
        : null,
    };
    this.countryCode = data.phone_code;
    this.editForm.setValue(data);
    this.aboutForm.setValue({ about_company: this.appData.about_company });
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'ticket-modal',
    });
  }
  get location() {
    return this.locationForm.get('location') as FormArray;
  }
  addItem() {
    const arrayControl = <FormArray>this.locationForm.controls['location'];
    let newGroup = this.formBuilder.group({
      address: ['', [Validators.required]],
      orders: ['']
    });
    arrayControl.push(newGroup);
  }
  removeItem(index) {
    const arrayControl = <FormArray>this.locationForm.controls['location'];
    arrayControl.removeAt(index);
  }

  get f() {
    return this.editForm.controls;
  }

  get i() {
    return this.imageForm.controls;
  }

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

  imageSubmit() {
    this.imageSubmitted = true;
    if (this.imageForm.invalid) {
      return;
    }
    var myFormData = new FormData();
    if (this.filedata) {
      myFormData.append('trade_license', this.imageForm.get('myFile').value);
    } else {
      myFormData.append('trade_license', "");
    }
    if (this.fileIdentity) {
      myFormData.append('proof_of_identity', this.imageForm.get('identity').value);
    } else {
      myFormData.append('proof_of_identity', "");
    }
    if (this.filelogo) {
      myFormData.append('company_logo', this.imageForm.get('logo').value);
    } else {
      myFormData.append('company_logo', "");
    }
    myFormData.append('form_step', '4');
    this.loader.startLoading();
    this.userService.editProfile(myFormData
    ).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.appData = JSON.parse(window.localStorage[APP_USER]);
        this.toastr.success(result.payload.message, 'Update Profile');
      }
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }



  onSubmit() {
    console.log(this.editForm);
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    const formdata = this.editForm.value;
    formdata.form_step = 1;
    formdata.phone_code = formdata.phone_number.countryCode;
    formdata.phone_number = formdata.phone_number.number;
    console.log(formdata);
    this.loader.startLoading();
    this.userService.editProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.appData = JSON.parse(window.localStorage[APP_USER]);
        this.toastr.success(result.payload.message, 'Update Profile');
      }
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }

  reviewSubmit(content) {
    const formdata = { form_step: 5 };
    this.loader.startLoading();
    this.userService.editProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.confirmMessage = result.message;
        this.appData = JSON.parse(window.localStorage[APP_USER]);
        this.open(content)
      }
    });
  }


  changeStep(step) { }

  makeActive(tabId: number) {
    let i = this.disabledTabs.indexOf(tabId);
    if (i >= 0) {
      this.disabledTabs.splice(i, 1);
    }
    this.activeTab = tabId;
  }

  showTab(tabId: number) {
    if (!this.isTabDisabled(tabId)) this.activeTab = tabId;
  }

  /*
    function name : isTabDisabled
	Explain :this function use for active previous tab"
    */
  goPrevious() {
    let prevTab = this.activeTab - 1;
    if (prevTab >= this.minTab) {
      this.makeActive(prevTab);
    }
  }

  isTabActive(tabId: number) {
    return this.activeTab === tabId;
  }

  isTabDisabled(tabId: number): boolean {
    return this.disabledTabs.indexOf(tabId) >= 0;
  }
  changeCompany(i) {
    this.headQuater = i;
  }

  locationSubmit() {
    this.locationSubmitted = true;
    console.log(this.locationForm)
    if (this.locationForm.invalid) {
      return;
    }
    const address = this.locationForm.value.location.map((value, index) => {
      return this.locationForm.value.location[index].address;
    });

    this.loader.startLoading();
    const data = {
      locations: address,
      form_step: 2,
      headquaters: this.headQuater
    };
    this.userService.editProfile(data).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.appData = JSON.parse(window.localStorage[APP_USER]);
        this.toastr.success(result.payload.message, 'Update Profile');
      }
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }
  aboutSubmit() {
    const formdata = this.aboutForm.value;
    formdata.form_step = 3;
    this.loader.startLoading();
    this.userService.editProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.appData = JSON.parse(window.localStorage[APP_USER]);
        this.toastr.success(result.payload.message, 'Update Profile');
      }
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }

  getAddress(place: object, i) {
    console.log(place);
    if (Object.keys(place).length > 0) {
      this.address = place['formatted_address'];
      this.formattedAddress = place['formatted_address'];
      this.zone.run(() => (this.formattedAddress = place['formatted_address']));
      this.addressForm.controls[i].patchValue({ address: this.address });
    }
  }
  get addressForm(): FormArray {
    return this.locationForm.get('location') as FormArray;
  }
  getValidity(i) {
    return (<FormArray>this.locationForm.get('location')).controls[i].invalid;
  }
}
