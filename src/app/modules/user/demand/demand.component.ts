import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { ElementRef, NgZone } from '@angular/core';
import { APP_USER } from '@configs/app-settings.config';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss']
})
export class DemandComponent implements OnInit {

  address: Object;
  establishmentAddress: Object;

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
  minTab = 1;      //Minimum Tab Step
  maxTab = 4       //Maximum Tab Step
  phoneForm: FormGroup;
  activeTab = this.minTab;
  disabledTabs: any = [2, 3, 4];
  appData: any;
  locationForm: FormGroup;
  ckeConfig: any;
  @ViewChild('searchElement', { static: false }) searchElement: ElementRef;
  @ViewChild("myckeditor", { static: false }) ckeditor: any;
  @ViewChild('MySelectForm', { static: false })
  mySelectForm: NgForm;
  hire: any;
  separateDialCode = true;
  selectedCity: any;
  countries = [
    { "name": "Afghanistan", "code": "AF" },
    { "name": "Åland Islands", "code": "AX" },
    { "name": "Albania", "code": "AL" },
    { "name": "Algeria", "code": "DZ" },
    { "name": "American Samoa", "code": "AS" },
    { "name": "AndorrA", "code": "AD" },
    { "name": "Angola", "code": "AO" },
    { "name": "Anguilla", "code": "AI" },
    { "name": "Antarctica", "code": "AQ" },
    { "name": "Antigua and Barbuda", "code": "AG" },
    { "name": "Argentina", "code": "AR" },
    { "name": "Armenia", "code": "AM" },
    { "name": "Aruba", "code": "AW" },
    { "name": "Australia", "code": "AU" },
    { "name": "Austria", "code": "AT" },
    { "name": "Azerbaijan", "code": "AZ" },
    { "name": "Bahamas", "code": "BS" },
    { "name": "Bahrain", "code": "BH" },
    { "name": "Bangladesh", "code": "BD" },
    { "name": "Barbados", "code": "BB" },
    { "name": "Belarus", "code": "BY" },
    { "name": "Belgium", "code": "BE" },
    { "name": "Belize", "code": "BZ" },
    { "name": "Benin", "code": "BJ" },
    { "name": "Bermuda", "code": "BM" },
    { "name": "Bhutan", "code": "BT" },
    { "name": "Bolivia", "code": "BO" },
    { "name": "Bosnia and Herzegovina", "code": "BA" },
    { "name": "Botswana", "code": "BW" },
    { "name": "Bouvet Island", "code": "BV" },
    { "name": "Brazil", "code": "BR" },
    { "name": "British Indian Ocean Territory", "code": "IO" },
    { "name": "Brunei Darussalam", "code": "BN" },
    { "name": "Bulgaria", "code": "BG" },
    { "name": "Burkina Faso", "code": "BF" },
    { "name": "Burundi", "code": "BI" },
    { "name": "Cambodia", "code": "KH" },
    { "name": "Cameroon", "code": "CM" },
    { "name": "Canada", "code": "CA" },
    { "name": "Cape Verde", "code": "CV" },
    { "name": "Cayman Islands", "code": "KY" },
    { "name": "Central African Republic", "code": "CF" },
    { "name": "Chad", "code": "TD" },
    { "name": "Chile", "code": "CL" },
    { "name": "China", "code": "CN" },
    { "name": "Christmas Island", "code": "CX" },
    { "name": "Cocos (Keeling) Islands", "code": "CC" },
    { "name": "Colombia", "code": "CO" },
    { "name": "Comoros", "code": "KM" },
    { "name": "Congo", "code": "CG" },
    { "name": "Congo, The Democratic Republic of the", "code": "CD" },
    { "name": "Cook Islands", "code": "CK" },
    { "name": "Costa Rica", "code": "CR" },
    {
      "name": "Cote D Ivoire", "code": "CI"
    },
    { "name": "Croatia", "code": "HR" },
    { "name": "Cuba", "code": "CU" },
    { "name": "Cyprus", "code": "CY" },
    { "name": "Czech Republic", "code": "CZ" },
    { "name": "Denmark", "code": "DK" },
    { "name": "Djibouti", "code": "DJ" },
    { "name": "Dominica", "code": "DM" },
    { "name": "Dominican Republic", "code": "DO" },
    { "name": "Ecuador", "code": "EC" },
    { "name": "Egypt", "code": "EG" },
    { "name": "El Salvador", "code": "SV" },
    { "name": "Equatorial Guinea", "code": "GQ" },
    { "name": "Eritrea", "code": "ER" },
    { "name": "Estonia", "code": "EE" },
    { "name": "Ethiopia", "code": "ET" },
    { "name": "Falkland Islands (Malvinas)", "code": "FK" },
    { "name": "Faroe Islands", "code": "FO" },
    { "name": "Fiji", "code": "FJ" },
    { "name": "Finland", "code": "FI" },
    { "name": "France", "code": "FR" },
    { "name": "French Guiana", "code": "GF" },
    { "name": "French Polynesia", "code": "PF" },
    { "name": "French Southern Territories", "code": "TF" },
    { "name": "Gabon", "code": "GA" },
    { "name": "Gambia", "code": "GM" },
    { "name": "Georgia", "code": "GE" },
    { "name": "Germany", "code": "DE" },
    { "name": "Ghana", "code": "GH" },
    { "name": "Gibraltar", "code": "GI" },
    { "name": "Greece", "code": "GR" },
    { "name": "Greenland", "code": "GL" },
    { "name": "Grenada", "code": "GD" },
    { "name": "Guadeloupe", "code": "GP" },
    { "name": "Guam", "code": "GU" },
    { "name": "Guatemala", "code": "GT" },
    { "name": "Guernsey", "code": "GG" },
    { "name": "Guinea", "code": "GN" },
    { "name": "Guinea-Bissau", "code": "GW" },
    { "name": "Guyana", "code": "GY" },
    { "name": "Haiti", "code": "HT" },
    { "name": "Heard Island and Mcdonald Islands", "code": "HM" },
    { "name": "Holy See (Vatican City State)", "code": "VA" },
    { "name": "Honduras", "code": "HN" },
    { "name": "Hong Kong", "code": "HK" },
    { "name": "Hungary", "code": "HU" },
    { "name": "Iceland", "code": "IS" },
    { "name": "India", "code": "IN" },
    { "name": "Indonesia", "code": "ID" },
    { "name": "Iran, Islamic Republic Of", "code": "IR" },
    { "name": "Iraq", "code": "IQ" },
    { "name": "Ireland", "code": "IE" },
    { "name": "Isle of Man", "code": "IM" },
    { "name": "Israel", "code": "IL" },
    { "name": "Italy", "code": "IT" },
    { "name": "Jamaica", "code": "JM" },
    { "name": "Japan", "code": "JP" },
    { "name": "Jersey", "code": "JE" },
    { "name": "Jordan", "code": "JO" },
    { "name": "Kazakhstan", "code": "KZ" },
    { "name": "Kenya", "code": "KE" },
    { "name": "Kiribati", "code": "KI" },
    {
      "name": "Korea, Democratic People S Republic of", "code": "KP"
    },
    { "name": "Korea, Republic of", "code": "KR" },
    { "name": "Kuwait", "code": "KW" },
    { "name": "Kyrgyzstan", "code": "KG" },
    {
      "name": "Lao People S Democratic Republic", "code": "LA"
    },
    { "name": "Latvia", "code": "LV" },
    { "name": "Lebanon", "code": "LB" },
    { "name": "Lesotho", "code": "LS" },
    { "name": "Liberia", "code": "LR" },
    { "name": "Libyan Arab Jamahiriya", "code": "LY" },
    { "name": "Liechtenstein", "code": "LI" },
    { "name": "Lithuania", "code": "LT" },
    { "name": "Luxembourg", "code": "LU" },
    { "name": "Macao", "code": "MO" },
    { "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
    { "name": "Madagascar", "code": "MG" },
    { "name": "Malawi", "code": "MW" },
    { "name": "Malaysia", "code": "MY" },
    { "name": "Maldives", "code": "MV" },
    { "name": "Mali", "code": "ML" },
    { "name": "Malta", "code": "MT" },
    { "name": "Marshall Islands", "code": "MH" },
    { "name": "Martinique", "code": "MQ" },
    { "name": "Mauritania", "code": "MR" },
    { "name": "Mauritius", "code": "MU" },
    { "name": "Mayotte", "code": "YT" },
    { "name": "Mexico", "code": "MX" },
    { "name": "Micronesia, Federated States of", "code": "FM" },
    { "name": "Moldova, Republic of", "code": "MD" },
    { "name": "Monaco", "code": "MC" },
    { "name": "Mongolia", "code": "MN" },
    { "name": "Montserrat", "code": "MS" },
    { "name": "Morocco", "code": "MA" },
    { "name": "Mozambique", "code": "MZ" },
    { "name": "Myanmar", "code": "MM" },
    { "name": "Namibia", "code": "NA" },
    { "name": "Nauru", "code": "NR" },
    { "name": "Nepal", "code": "NP" },
    { "name": "Netherlands", "code": "NL" },
    { "name": "Netherlands Antilles", "code": "AN" },
    { "name": "New Caledonia", "code": "NC" },
    { "name": "New Zealand", "code": "NZ" },
    { "name": "Nicaragua", "code": "NI" },
    { "name": "Niger", "code": "NE" },
    { "name": "Nigeria", "code": "NG" },
    { "name": "Niue", "code": "NU" },
    { "name": "Norfolk Island", "code": "NF" },
    { "name": "Northern Mariana Islands", "code": "MP" },
    { "name": "Norway", "code": "NO" },
    { "name": "Oman", "code": "OM" },
    { "name": "Pakistan", "code": "PK" },
    { "name": "Palau", "code": "PW" },
    { "name": "Palestinian Territory, Occupied", "code": "PS" },
    { "name": "Panama", "code": "PA" },
    { "name": "Papua New Guinea", "code": "PG" },
    { "name": "Paraguay", "code": "PY" },
    { "name": "Peru", "code": "PE" },
    { "name": "Philippines", "code": "PH" },
    { "name": "Pitcairn", "code": "PN" },
    { "name": "Poland", "code": "PL" },
    { "name": "Portugal", "code": "PT" },
    { "name": "Puerto Rico", "code": "PR" },
    { "name": "Qatar", "code": "QA" },
    { "name": "Reunion", "code": "RE" },
    { "name": "Romania", "code": "RO" },
    { "name": "Russian Federation", "code": "RU" },
    { "name": "RWANDA", "code": "RW" },
    { "name": "Saint Helena", "code": "SH" },
    { "name": "Saint Kitts and Nevis", "code": "KN" },
    { "name": "Saint Lucia", "code": "LC" },
    { "name": "Saint Pierre and Miquelon", "code": "PM" },
    { "name": "Saint Vincent and the Grenadines", "code": "VC" },
    { "name": "Samoa", "code": "WS" },
    { "name": "San Marino", "code": "SM" },
    { "name": "Sao Tome and Principe", "code": "ST" },
    { "name": "Saudi Arabia", "code": "SA" },
    { "name": "Senegal", "code": "SN" },
    { "name": "Serbia and Montenegro", "code": "CS" },
    { "name": "Seychelles", "code": "SC" },
    { "name": "Sierra Leone", "code": "SL" },
    { "name": "Singapore", "code": "SG" },
    { "name": "Slovakia", "code": "SK" },
    { "name": "Slovenia", "code": "SI" },
    { "name": "Solomon Islands", "code": "SB" },
    { "name": "Somalia", "code": "SO" },
    { "name": "South Africa", "code": "ZA" },
    { "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
    { "name": "Spain", "code": "ES" },
    { "name": "Sri Lanka", "code": "LK" },
    { "name": "Sudan", "code": "SD" },
    { "name": "Suriname", "code": "SR" },
    { "name": "Svalbard and Jan Mayen", "code": "SJ" },
    { "name": "Swaziland", "code": "SZ" },
    { "name": "Sweden", "code": "SE" },
    { "name": "Switzerland", "code": "CH" },
    { "name": "Syrian Arab Republic", "code": "SY" },
    { "name": "Taiwan, Province of China", "code": "TW" },
    { "name": "Tajikistan", "code": "TJ" },
    { "name": "Tanzania, United Republic of", "code": "TZ" },
    { "name": "Thailand", "code": "TH" },
    { "name": "Timor-Leste", "code": "TL" },
    { "name": "Togo", "code": "TG" },
    { "name": "Tokelau", "code": "TK" },
    { "name": "Tonga", "code": "TO" },
    { "name": "Trinidad and Tobago", "code": "TT" },
    { "name": "Tunisia", "code": "TN" },
    { "name": "Turkey", "code": "TR" },
    { "name": "Turkmenistan", "code": "TM" },
    { "name": "Turks and Caicos Islands", "code": "TC" },
    { "name": "Tuvalu", "code": "TV" },
    { "name": "Uganda", "code": "UG" },
    { "name": "Ukraine", "code": "UA" },
    { "name": "United Arab Emirates", "code": "AE" },
    { "name": "United Kingdom", "code": "GB" },
    { "name": "United States", "code": "US" },
    { "name": "United States Minor Outlying Islands", "code": "UM" },
    { "name": "Uruguay", "code": "UY" },
    { "name": "Uzbekistan", "code": "UZ" },
    { "name": "Vanuatu", "code": "VU" },
    { "name": "Venezuela", "code": "VE" },
    { "name": "Viet Nam", "code": "VN" },
    { "name": "Virgin Islands, British", "code": "VG" },
    { "name": "Virgin Islands, U.S.", "code": "VI" },
    { "name": "Wallis and Futuna", "code": "WF" },
    { "name": "Western Sahara", "code": "EH" },
    { "name": "Yemen", "code": "YE" },
    { "name": "Zambia", "code": "ZM" },
    { "name": "Zimbabwe", "code": "ZW" }
  ];
  demandId: any;
  hireDemand: any = "locally";
  error: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService, public zone: NgZone, public modalService: NgbModal,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService, private ngZone: NgZone) {
    for (let i = 2020; i >= 1950; i--) {
      this.years.push(i);
    }
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }


  ngOnInit() {
    this.userService.checkDemand().subscribe((result: any) => {
      if (result.payload.demand) {
        this.demandId = result.payload.demand.id
      }

    });
    const locationForm = this.formBuilder.group({
      location: this.formBuilder.array([])
    });
    this.aboutForm = this.formBuilder.group({
      about_company: ['']
    });
    const arrayControl = <FormArray>locationForm.controls['location'];
    let newGroup = this.formBuilder.group({
      address: ['', [Validators.required]]
    });
    arrayControl.push(newGroup);
    this.locationForm = locationForm;
    this.appData = JSON.parse(window.localStorage[APP_USER]);
    //this.setFormdata();
    //this.setLocation(locationForm, arrayControl);
    this.phoneForm = this.formBuilder.group({
      phone: ['']
    });
  }

  demandFirst() {
    if (this.hireDemand == "locally") {

    } else {
      this.mySelectForm.form.markAllAsTouched();
      if (this.mySelectForm.form.invalid) {
        this.error = 'Please fill valid details!';
        return false;
      } else {
        this.error = "";
        this.userService.checkDemand().subscribe((result: any) => {


        });
      }

    }
    console.log(this.selectedCity);
  }

  checkDemand(event) {
    console.log(2323);
    this.hire = event.target.value;
  }
  isActive() {
    if (this.hire == 'overseas') {
      return true
    } else {
      return false;
    }
  }

  setLocation(locationForm, newGroup) {
    const location = this.appData.users_locations.map((value, index) => {
      return this.appData.users_locations[index].address;
    })
    let groupArr = []
    for (let i = 0; i < location.length; i++) {
      groupArr.push(this.formBuilder.group({ 'address': [location[i], Validators.required] }));
    }

    this.locationForm.setControl('location', this.formBuilder.array(groupArr));
    console.log(this.locationForm.get('location')['controls'][0].value.address);
  }
  setFormdata() {
    var data = {
      agency_name: this.appData.agency_name,
      company_size: this.appData.company_size,
      designation: this.appData.designation,
      owner_name: this.appData.owner_name,
      phone_code: this.appData.phone_code || "+91",
      phone_number: this.appData.phone_number,
      website: this.appData.website,
      year_of_establishment: (this.appData.year_of_establishment) ? Number(this.appData.year_of_establishment) : null
    }
    this.editForm.setValue(data);
    this.aboutForm.setValue({ about_company: this.appData.about_company });
  }


  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'ticket-modal' });
  }
  get location() {
    return this.locationForm.get('location') as FormArray;
  }
  addItem() {
    const arrayControl = <FormArray>this.locationForm.controls['location'];
    let newGroup = this.formBuilder.group({
      address: ['', [Validators.required]]
    });
    arrayControl.push(newGroup);
  }
  removeItem(index) {
    const arrayControl = <FormArray>this.locationForm.controls['location'];
    arrayControl.removeAt(index);
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
    console.log(this.editForm);
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }


    const formdata = this.editForm.value;
    formdata.form_step = 1;

    this.loader.startLoading();
    this.userService.editProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user["authToken"] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetail(result.payload.user);
      }
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });

  }

  reviewSubmit() {
    const formdata = { form_step: 5 };

    this.loader.startLoading();
    this.userService.editProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user["authToken"] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetail(result.payload.user);
      }

    });
  }
  changeStep(step) {

  }

  makeActive(tabId: number) {
    let i = this.disabledTabs.indexOf(tabId);
    if (i >= 0) {
      this.disabledTabs.splice(i, 1);
    }
    this.activeTab = tabId;
  }

  showTab(tabId: number) {
    if (!this.isTabDisabled(tabId))
      this.activeTab = tabId;
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
    })

    this.loader.startLoading();
    const data = {
      locations: address,
      form_step: 2
    }
    this.userService.editProfile(data).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user["authToken"] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetail(result.payload.user);
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
        result.payload.user["authToken"] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetail(result.payload.user);
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
      this.zone.run(() => this.formattedAddress = place['formatted_address']);
      this.addressForm.controls[i].setValue({ address: this.address });
    } else {
      this.addressForm.controls[i].setValue({ address: "" });
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

