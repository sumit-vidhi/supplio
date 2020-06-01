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

@Component({
  selector: 'app-agency-profile',
  templateUrl: './agency-profile.component.html',
  styleUrls: ['./agency-profile.component.scss'],
})
export class AgencyProfileComponent implements OnInit {
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
  maxTab = 14; //Maximum Tab Step
  phoneForm: FormGroup;
  activeTab = this.minTab;
  disabledTabs: any = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  appData: any;
  locationForm: FormGroup;
  ckeConfig: any;
  countryCode = "IN";
  @ViewChild('searchElement', { static: false }) searchElement: ElementRef;
  @ViewChild('myckeditor', { static: false }) ckeditor: any;
  confirmMessage: any;
  imageForm: FormGroup;
  filedata: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public zone: NgZone,
    public modalService: NgbModal,
    private router: Router,
    private loader: LoaderService,
    public loginService: JWTAuthService,
    private ngZone: NgZone, private http: HttpClient
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
      myFile: ['']
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
    });
    arrayControl.push(newGroup);
    this.locationForm = locationForm;
    this.appData = JSON.parse(window.localStorage[APP_USER]);
    //if (this.appData.phone_number) {

    this.setFormdata();
    if (this.appData.users_locations.length > 0) {
      this.setLocation(locationForm, arrayControl);
    }
    this.phoneForm = this.formBuilder.group({
      phone: [''],
    });
  }

  setLocation(locationForm, newGroup) {
    const location = this.appData.users_locations.map((value, index) => {
      return this.appData.users_locations[index].address;
    });
    let groupArr = [];
    for (let i = 0; i < location.length; i++) {
      groupArr.push(
        this.formBuilder.group({ address: [location[i], Validators.required] })
      );
    }

    this.locationForm.setControl('location', this.formBuilder.array(groupArr));
    console.log(this.locationForm.get('location')['controls'][0].value.address);
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
    console.log(this.filedata);
  }
  setFormdata() {
    var data = {
      agency_name: this.appData.agency_name,
      company_size: this.appData.company_size,
      designation: this.appData.designation,
      owner_name: this.appData.owner_name,
      phone_code: this.appData.phone_code || 'IN',
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

    var myFormData = new FormData();
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'no-auth': 'true'
    });
    myFormData.append('trade_license', this.filedata, this.filedata.name);
    //  myFormData.append('form_step', '4');

    console.log(headers);
    this.userService.imageUpload(myFormData
    ).subscribe(data => {
      console.log(data);
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

  locationSubmit() {
    this.locationSubmitted = true;
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
    };
    this.userService.editProfile(data).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.appData = JSON.parse(window.localStorage[APP_USER]);
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
      this.addressForm.controls[i].setValue({ address: this.address });
    } else {
      this.addressForm.controls[i].setValue({ address: '' });
    }
    console.log(this.addressForm);
  }
  get addressForm(): FormArray {
    return this.locationForm.get('location') as FormArray;
  }
  getValidity(i) {
    return (<FormArray>this.locationForm.get('location')).controls[i].invalid;
  }
}
