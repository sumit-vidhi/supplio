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
import { idLocale } from 'ngx-bootstrap/chronos/i18n/id';

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
  config2: any = { 'placeholder': 'category', 'sourceField': 'name' };
  selectedItem: any = [];
  selectedSubItem: any = [];
  inputChanged: any = '';
  category: any;
  subcategory: any;
  subcategoryData = [];
  setCategory: any;
  setSubCategory: any;
  submittedCategory = false;
  selected: any;
  categories: any = [];
  subCategories: any = [];
  experienceForm: FormGroup;
  experienceSubmitted = false;
  workForm: FormGroup;
  workSubmitted = false;
  fileName: any = [];
  filePath: any = [];
  declareForm: FormGroup;
  declareSubmitted = false;
  qusetFirst: any;
  associationForm: FormGroup;
  associationSubmitted = false;
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

  /*
   function name : createForm
   Explain :this function use for create eduaction name year and diploma field"
   */
  initAddress(value) {
    return this.formBuilder.group({
      name: ['', Validators.required]

    });

  }

  addAddress() {
    // const control = <FormArray>this.trainerForm.controls['addresses'];
    const control = this.experienceForm.get(`countryName`) as FormArray;
    control.push(this.initAddress(null));
  }
  addWork() {
    const control = this.workForm.get(`name`) as FormArray;
    control.push(this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    }));
  }
  ngOnInit() {
    this.declareForm = this.formBuilder.group({
      ques1: [null, Validators.required],
      ques2: [null, Validators.required],
      ques3: [null, Validators.required],
      ques4: [null, Validators.required],
      ques1why: ['']
    })
    this.experienceForm = this.formBuilder.group({
      categoryName: new FormArray([]),
      subCategoryName: new FormArray([]),
      countryName: new FormArray([])
    });
    this.workForm = this.formBuilder.group({
      name: new FormArray([])
    });
    this.associationForm = this.formBuilder.group({
      name: new FormArray([])
    });

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
    this.userService.getSubcategoies().subscribe((result: any) => {
      this.category = result.payload.categories;
    });
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
    this.setWork();

    this.setFormdata();
    if (this.appData.users_locations.length > 0) {
      this.setLocation(locationForm, arrayControl);
    }
    this.categories = this.appData.expertise_industries;
    this.subCategories = this.appData.expertise_categories;
    this.phoneForm = this.formBuilder.group({
      phone: [''],
    });
    if (this.appData.expertise_industries) {
      this.selectedItem = this.appData.expertise_industries;
      this.selectedSubItem = this.appData.expertise_categories;
    }

    if (this.selectedItem.length) {
      for (let i = 0; i < this.selectedItem.length; i++) {
        this.onSelectChange(this.selectedItem[i].id, this.selectedItem[i].name);
      }

      this.setDeclartion();
      this.setAssociation();

    }

  }
  setDeclartion() {
    if (this.appData.declarations[0].ques1 == 'no') {
      this.qusetFirst = "no";
      this.declareForm.controls.ques1why.setValidators(Validators.required);
      this.declareForm.controls.ques1why.updateValueAndValidity();
    }
    this.declareForm.setValue(this.appData.declarations[0]);
  }

  setWork() {
    if (this.appData && this.appData.agency_work) {
      for (let i = 0; i < this.appData.agency_work.length; i++) {

        this.wokName.push(this.formBuilder.group({
          name: [this.appData.agency_work[i].description, Validators.required],
          image: [this.appData.agency_work[i].filepath, Validators.required]
        }));
        this.fileName[i] = this.appData.agency_work[i].filename;
        this.filePath[i] = this.appData.agency_work[i].filepath;
      }
    } else {
      this.wokName.push(this.formBuilder.group({
        name: ['', Validators.required],
        image: ['', Validators.required]
      }));
    }
  }
  onAssociationSubmit() {
    this.associationSubmitted = true;
    if (this.associationForm.invalid) {
      return;
    }
  }

  setAssociation() {
    if (this.appData && this.appData.associations) {
      for (let i = 0; i < this.appData.associations.length; i++) {

        this.accociationName.push(this.formBuilder.group({
          name: [this.appData.agency_work[i].name, Validators.required],
          type: [this.appData.agency_work[i].type, Validators.required]
        }));
      }
    } else {
      this.accociationName.push(this.formBuilder.group({
        name: ['', Validators.required],
        type: ['', Validators.required]
      }));
    }
  }

  get accociationName() { return this.a.name as FormArray; }
  onSelectChange(id, name) {
    this.loader.startLoading();
    this.userService.getAllSubcategoies(id).subscribe((result: any) => {
      this.loader.stopLoading();
      this.subcategory = [{ label: name, items: result.payload.categories }];
      this.subcategoryData = [...this.subcategoryData, ...this.subcategory];
    });
  }
  onChangeCountry(value) {
    if (value && value.length) {
      for (let i = 0; i < value.length; i++) {
        this.c.push(this.formBuilder.group({
          name: [value[i], Validators.required]
        }));
      }
    } else {
      for (let i = 0; i < this.categories.length; i++) {
        this.c.push(this.formBuilder.group({
          name: ['', Validators.required]
        }));
      }
    }


  }

  onChangeTickets(value) {
    if (value && value.length) {
      for (let i = 0; i < this.categories.length; i++) {
        this.t.push(this.formBuilder.group({
          name: [value[i], Validators.required]
        }));
      }
    } else {
      for (let i = 0; i < this.categories.length; i++) {
        this.t.push(this.formBuilder.group({
          name: ['', Validators.required]
        }));
      }
    }


  }
  onChangeSubTickets(value) {
    if (value && value.length) {
      for (let i = 0; i < this.subCategories.length; i++) {
        this.s.push(this.formBuilder.group({
          name: [value[i], Validators.required]
        }));
      }
    } else {
      for (let i = 0; i < this.subCategories.length; i++) {
        this.s.push(this.formBuilder.group({
          name: ['', Validators.required]
        }));
      }
    }


  }

  onDeclareFormSubmit() {
    this.declareSubmitted = true;
    if (this.declareForm.invalid) {
      return;
    }

    const formdata = { form_step: 7, declaration: [this.declareForm.value] };
    this.loader.startLoading();
    this.userService.agencyeditProfile(formdata).subscribe((result: any) => {
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

  workUpload(event, i) {
    if (this.wokName.controls[i].value.name == "") {
      alert("Please enter the name.");
      return;
    }
    var myFormData = new FormData();
    myFormData.append('file', event.target.files[0]);
    myFormData.append('name', this.wokName.controls[i].value.name);

    myFormData.append('form_step', "6");

    this.loader.startLoading();
    this.userService.agencyeditProfile(myFormData).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.appData = JSON.parse(window.localStorage[APP_USER]);
      }
    });

  }
  onExperienceSubmit() {
    this.experienceSubmitted = true;
    const valueAray = this.experienceForm.value.categoryName.map((data) => {
      return data.name;
    });
    const valueSubAray = this.experienceForm.value.subCategoryName.map((data) => {
      return data.name;
    });
    const valuecateAray = this.selectedItem.map((data) => {
      return data.id;
    });
    const valueSubcateAray = this.selectedSubItem.map((data) => {
      return data.id;
    });
    const newCateArray = valuecateAray.concat(valueSubcateAray).join(",");
    const newArray = valueAray.concat(valueSubAray).join(",");
    // stop here if form is invalid
    const valueCountryAray = this.experienceForm.value.countryName.map((data) => {
      return data.name;
    }).join(",");
    if (this.experienceForm.invalid) {
      return;
    }
    const formdata = {
      form_step: 5,
      experience_ids: newCateArray,
      experience_values: newArray,
      experience_countries: valueCountryAray
    }
    this.loader.startLoading();
    this.userService.agencyeditProfile(formdata).subscribe((result: any) => {
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

  onWorkSubmit() {
    this.workSubmitted = true;
    if (this.workForm.invalid) {
      return;
    }
    let nextTab = this.activeTab + 1;
    if (nextTab <= this.maxTab) {
      this.makeActive(nextTab);
    }

  }

  get d() { return this.experienceForm.controls; }
  get t() { return this.d.categoryName as FormArray; }
  get c() { return this.d.countryName as FormArray; }
  get s() { return this.d.subCategoryName as FormArray; }
  get a() { return this.associationForm.controls; }
  get w() { return this.workForm.controls; }
  get wokName() { return this.w.name as FormArray; }

  onSelectsubcategory(event) {
    let rt;
    for (let i = 0; i < this.subcategoryData.length; i++) {
      rt = this.getdata(i);
      if (rt.length) {
        this.setSubCategory = rt[0];
      }
    }

  }
  getdata(i) {
    const er = this.subcategoryData[i].items.filter((data) => {
      return data.id == this.selected;
    });
    if (er) {
      return er;
    }
  }

  onInputChangedEventsubcategory(val: string) {

  }
  addSubCategory(item) {
    if (item) {
      this.selectedSubItem.push(item);
    }
  }

  addCategory(item) {

    let getIndex = -1;
    if (this.selectedItem) {
      getIndex = this.selectedItem.findIndex((data) => data.id == item.id);
    }
    if (item && getIndex == -1) {
      this.selectedItem.push(item);
      this.subcategoryData = [...this.subcategoryData, ...this.subcategory];
    }
  }

  onSelect(item: any) {
    this.setCategory = item;
    let getIndex = -1;
    if (this.selectedItem) {
      getIndex = this.selectedItem.findIndex((data) => data.id == item.id);
    }

    if (getIndex == -1) {
      this.loader.startLoading();
      this.userService.getAllSubcategoies(item.id).subscribe((result: any) => {
        this.loader.stopLoading();
        this.subcategory = [{ label: item.name, items: result.payload.categories }];
      });
    }
  }
  remove(id, index) {
    // this.subcategoryData = this.subcategoryData[index].items.filter((data) => {
    //   return data.id != id;
    // });
    this.selected = "";
    this.subcategoryData.splice(index, 1);
    this.selectedItem = this.selectedItem.filter((data) => {
      return data.id != id;
    });
    this.selectedSubItem = this.selectedSubItem.filter((data) => {
      return data.parent != id;
    });
  }
  removeSubcategory(id) {
    this.selectedSubItem = this.selectedSubItem.filter((data) => {
      return data.id != id;
    });
  }

  submitCategory() {
    this.submittedCategory = true;
    if (this.selectedItem.length == 0) {
      return;
    }
    if (this.selectedSubItem.length == 0) {
      return;
    }
    const categoryArray = this.selectedItem.map((data) => {
      return data.id;
    })
    const subcategoryArray = this.selectedSubItem.map((data) => {
      return data.id;
    })
    const category = categoryArray.join(",");
    const subCategory = subcategoryArray.join(",");
    const formdata = {
      form_step: 4,
      expertise_industries: category,
      expertise_categories: subCategory
    }
    this.loader.startLoading();
    this.userService.agencyeditProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetailData(result.payload.user);
        this.experienceForm = this.formBuilder.group({
          categoryName: new FormArray([]),
          subCategoryName: new FormArray([]),
          countryName: new FormArray([])
        });
        this.appData = JSON.parse(window.localStorage[APP_USER]);
        this.categories = this.appData.expertise_industries;
        this.subCategories = this.appData.expertise_categories;

        const cateValue = this.appData.experience_industries_values;
        const subCategoriesValue = this.appData.experience_categories_values;

        const countries = this.appData.experience_countries;
        // this.initAddress(countries);

        this.onChangeTickets(cateValue);
        this.onChangeSubTickets(subCategoriesValue);
        this.onChangeCountry(countries);
      }
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });

  }

  onInputChangedEvent(val: string) {
    this.inputChanged = '';
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
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
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
  removeCountry(index) {
    const arrayControl = <FormArray>this.experienceForm.controls['countryName'];
    arrayControl.removeAt(index);
  }

  removeWork(index) {
    const arrayControl = <FormArray>this.workForm.controls['name'];
    arrayControl.removeAt(index);
  }

  get f() {
    return this.editForm.controls;
  }
  get declare() {
    return this.declareForm.controls;
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
    this.userService.imageUpload(myFormData
    ).subscribe(data => {
    });
  }



  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    const formdata = this.editForm.value;
    formdata.form_step = 1;
    formdata.phone_code = formdata.phone_number.countryCode;
    formdata.phone_number = formdata.phone_number.number;
    this.loader.startLoading();
    this.userService.agencyeditProfile(formdata).subscribe((result: any) => {
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
    this.userService.agencyeditProfile(formdata).subscribe((result: any) => {
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
    this.userService.agencyeditProfile(data).subscribe((result: any) => {
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
    this.userService.agencyeditProfile(formdata).subscribe((result: any) => {
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

  checkQuest(event) {
    this.qusetFirst = event.target.value;
    if (this.qusetFirst == "no") {
      this.declareForm.controls.ques1why.setValidators(Validators.required);
      this.declareForm.controls.ques1why.updateValueAndValidity();
    } else {
      this.declareForm.controls.ques1why.clearValidators();
      this.declareForm.controls.ques1why.updateValueAndValidity();
    }
  }

  getAddress(place: object, i) {
    if (Object.keys(place).length > 0) {
      this.address = place['formatted_address'];
      this.formattedAddress = place['formatted_address'];
      this.zone.run(() => (this.formattedAddress = place['formatted_address']));
      this.addressForm.controls[i].setValue({ address: this.address });
    } else {
      this.addressForm.controls[i].setValue({ address: '' });
    }
  }
  get addressForm(): FormArray {
    return this.locationForm.get('location') as FormArray;
  }
  getValidity(i) {
    return (<FormArray>this.locationForm.get('location')).controls[i].invalid;
  }
}
