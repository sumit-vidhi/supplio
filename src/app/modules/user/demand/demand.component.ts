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
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { ElementRef, NgZone } from '@angular/core';
import { APP_USER } from '@configs/app-settings.config';
import { countries } from '../country';
import { countriesCode } from '../country'
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss'],
})
export class DemandComponent implements OnInit {
  address: Object;
  establishmentAddress: Object;
  termForm: FormGroup;
  termsubmitted = false;
  formattedAddress: string;
  formattedEstablishmentAddress: string;
  modalReference: NgbModalRef;
  phone: string;
  editForm: FormGroup;
  aboutForm: FormGroup;
  submitted = false;
  locationSubmitted = false;
  titleSubmitted = false;
  message: any;
  referral: any;
  email: any;
  userName: any;
  firstName: any;
  lastName: any;
  benefitForm: FormGroup;
  years: Array<number> = [];
  minTab = 1; //Minimum Tab Step
  maxTab = 6; //Maximum Tab Step
  phoneForm: FormGroup;
  activeTab = this.minTab;
  disabledTabs: any = [2, 3, 4, 5, 6];
  appData: any;
  locationForm: FormGroup;
  ckeConfig: any;
  postDemand = 1;
  @ViewChild('searchElement', { static: false }) searchElement: ElementRef;
  @ViewChild('myckeditor', { static: false }) ckeditor: any;
  @ViewChild('MySelectForm', { static: false })
  mySelectForm: NgForm;
  hire: any;
  separateDialCode = true;
  selectedCity: any;
  // isValidDetail = false;
  countries = countries;
  countriesCode = countriesCode;
  isValidDetail = [false];
  demandId: any;
  hireDemand: any = 'overseas';
  demandTitle: any;
  error: any;
  demandCategory: any;
  category: any;
  subcategory: any = [];
  confirmMessage: any;
  accomdation: any;
  transportation: any;
  food: any;
  currency: any;
  modeInterview: any;
  id: any;
  updated_at: any;
  demand: any;
  showDetailData = false;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public zone: NgZone,
    public modalService: NgbModal,
    private router: Router,
    private loader: LoaderService,
    public loginService: JWTAuthService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    for (let i = 2020; i >= 1950; i--) {
      this.years.push(i);
    }
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
    };
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });


  }

  ngOnInit() {

    const locationForm = this.formBuilder.group({
      currency: ['', Validators.required],
      location: this.formBuilder.array([]),
    });
    this.aboutForm = this.formBuilder.group({
      about_company: [''],
    });
    this.termForm = this.formBuilder.group({
      // address: ['', [Validators.required]]
      mode_of_interview: ['', [Validators.required]],
      recruitment_fee: ['', [Validators.required]],
      no_of_delegates: ['', [Validators.required]],
      flights_for_delegates: ['', [Validators.required]],
      hotels_for_delegates: ['', [Validators.required]],
    });
    const arrayControl = <FormArray>locationForm.controls['location'];
    let newGroup = this.formBuilder.group({
      parent_category_id: ['', [Validators.required]],
      category_id: [null, [Validators.required]],
      quantity: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nationality: [''],
      age_bracket: [''],
      qualification: [''],
      years_of_experience: [''],
      driver_license: [''],
      job_desc: [''],
    });
    this.benefitForm = this.formBuilder.group({
      // address: ['', [Validators.required]]
      accommodation: [null, [Validators.required]],
      accomdationAllowance: [''],
      visa_sponsorship: ['', [Validators.required]],
      transportation: ['', [Validators.required]],
      transportationAllowance: [''],
      food: ['', [Validators.required]],
      foodAllowance: [''],
      employment_location: [''],
      employment_country: ['', [Validators.required]],
      employment_city: ['', [Validators.required]],
      contract_duration: ['', [Validators.required]],
      contract_type: ['', [Validators.required]],
      working_hours_day: ['', [Validators.required]],
      working_hours_week: [null, [Validators.required]],
      probation_period: ['', [Validators.required]],
      overtime: ['', [Validators.required]],
      medical_insurance: ['', [Validators.required]],
      joining_ticket: ['', [Validators.required]],
      paid_leaves: ['', [Validators.required]],
      paid_leaves_duration: ['', [Validators.required]],
      leave_ticket: ['', [Validators.required]],
      uniform: ['', [Validators.required]],
      other_benefits: [''],
    });
    arrayControl.push(newGroup);
    this.locationForm = locationForm;
    this.appData = JSON.parse(window.localStorage[APP_USER]);

    this.phoneForm = this.formBuilder.group({
      phone: [''],
    });
    if (this.id) {
      this.loader.startLoading();
      this.userService.getDemand(this.id).subscribe((result: any) => {

        if (result.payload.demand) {
          this.loader.stopLoading();
          this.demand = result.payload.demand[0];
          this.demandId = result.payload.demand[0].id;
          this.hireDemand = result.payload.demand[0].hire_type;
          this.demandTitle = result.payload.demand[0].title;
          this.updated_at = result.payload.demand[0].updated_at;
          this.hire = this.hireDemand;
          this.demandCategory = result.payload.demand[0].demand_category;
          this.selectedCity = result.payload.demand[0].hire_country;
          this.locationForm.patchValue({
            currency: result.payload.demand[0].currency
          });
          this.setCurrencyByData(result.payload.demand[0].currency)
          this.modeInterview = result.payload.demand[0].mode_of_interview;
          if (result.payload.demand[0].demand_category.length) {
            this.setLocation();
            this.setBenifit(result.payload.demand[0]);
            this.setTerm(result.payload.demand[0]);
            this.postDemand = result.payload.demand[0].demand_type.toString();;
          }
          if (this.demand.last_step_updated) {
            this.disabledTabs = this.disabledTabs.slice(this.demand.last_step_updated);
            console.log(this.disabledTabs);
          }
        }
      });
    } else {
      this.loader.startLoading();
      this.userService.checkDemand().subscribe((result: any) => {
        if (result.payload.demand) {
          this.loader.stopLoading();
          this.demand = result.payload.demand;
          this.setCurrencyByData(result.payload.demand.currency)
          this.demandId = result.payload.demand.id;
          this.updated_at = result.payload.demand.updated_at;
          if (result.payload.demand.hire_type != 'locally') {
            this.hireDemand = result.payload.demand.hire_type;
            this.hire = this.hireDemand;
            console.log(12112);
          }

          this.demandTitle = result.payload.demand.title;
          this.demandCategory = result.payload.demand.demand_category;
          this.selectedCity = result.payload.demand.hire_country;
          this.locationForm.patchValue({
            currency: result.payload.demand.currency
          });
          this.modeInterview = result.payload.demand.mode_of_interview;
          if (result.payload.demand.demand_category.length) {

            this.setLocation();
            this.setBenifit(result.payload.demand);
            this.setTerm(result.payload.demand);
            this.postDemand = result.payload.demand.demand_type.toString();;
          }
        }
      });
    }
    this.userService.getSubcategoies().subscribe((result: any) => {
      this.category = result.payload.categories.filter((data) => {
        return data.parent == 0;
      });
    });

  }

  setData(result) {
    this.demand = result.payload.demand;
    this.setCurrencyByData(result.payload.demand.currency)
    this.demandId = result.payload.demand.id;
    this.updated_at = result.payload.demand.updated_at;
    if (result.payload.demand.hire_type != 'locally') {
      this.hireDemand = result.payload.demand.hire_type;
      this.hire = this.hireDemand;
      console.log(12112);
    }

    this.demandTitle = result.payload.demand.title;
    this.demandCategory = result.payload.demand.demand_category;
    this.selectedCity = result.payload.demand.hire_country;
    this.locationForm.patchValue({
      currency: result.payload.demand.currency
    });
    this.modeInterview = result.payload.demand.mode_of_interview;
    if (result.payload.demand.demand_category.length) {

      this.setLocation();
      this.setBenifit(result.payload.demand);
      this.setTerm(result.payload.demand);
      if (result.payload.demand && result.payload.demand.demand_type) {
        this.postDemand = result.payload.demand.demand_type.toString();
      }

    }
  }
  showDetails(i) {
    this.showDetailData = !this.showDetailData;
  }


  getSubcategory(id, i) {
    this.loader.startLoading();
    this.userService.getAllSubcategoies(id).subscribe((result: any) => {
      this.loader.stopLoading();
      this.subcategory[i] = result.payload.categories;
    });
  }

  categoryChange(event, i) {
    this.loader.startLoading();
    this.userService.getAllSubcategoies(event.target.value).subscribe((result: any) => {
      this.loader.stopLoading();
      this.subcategory[i] = result.payload.categories;
    });
  }
  changeAccomdation(event) {
    this.accomdation = event.target.value;
    if (this.accomdation == "Allowance") {
      this.benefitForm.controls.accomdationAllowance.setValidators(Validators.required);
      this.benefitForm.controls.accomdationAllowance.updateValueAndValidity();
    } else {
      this.benefitForm.controls.accomdationAllowance.clearValidators();
      this.benefitForm.controls.accomdationAllowance.updateValueAndValidity();
    }
  }
  changeTransportation(event) {
    this.transportation = event.target.value;
    if (this.transportation == "Allowance") {
      this.benefitForm.controls.transportationAllowance.setValidators(Validators.required);
      this.benefitForm.controls.transportationAllowance.updateValueAndValidity();
    } else {
      this.benefitForm.controls.transportationAllowance.clearValidators();
      this.benefitForm.controls.transportationAllowance.updateValueAndValidity();
    }
  }
  changeFood(event) {
    this.food = event.target.value;
    if (this.food == "Allowance") {
      this.benefitForm.controls.foodAllowance.setValidators(Validators.required);
      this.benefitForm.controls.foodAllowance.updateValueAndValidity();
    } else {
      this.benefitForm.controls.foodAllowance.clearValidators();
      this.benefitForm.controls.foodAllowance.updateValueAndValidity();
    }
  }

  changeMode(event) {
    this.modeInterview = event.target.value;
    if (this.modeInterview == "In person") {
      this.termForm.controls.no_of_delegates.setValidators(Validators.required);
      this.termForm.controls.no_of_delegates.updateValueAndValidity();

      this.termForm.controls.flights_for_delegates.setValidators(Validators.required);
      this.termForm.controls.flights_for_delegates.updateValueAndValidity();

      this.termForm.controls.hotels_for_delegates.setValidators(Validators.required);
      this.termForm.controls.hotels_for_delegates.updateValueAndValidity();

    } else {

      this.termForm.controls.no_of_delegates.clearValidators();
      this.termForm.controls.no_of_delegates.updateValueAndValidity();
      this.termForm.controls.flights_for_delegates.clearValidators();
      this.termForm.controls.flights_for_delegates.updateValueAndValidity();
      this.termForm.controls.hotels_for_delegates.clearValidators();
      this.termForm.controls.hotels_for_delegates.updateValueAndValidity();

    }
  }


  setBenifit(data) {
    const newData = {
      accommodation: data.accommodation,
      visa_sponsorship: data.visa_sponsorship,
      transportation: data.transportation,
      food: data.food,
      foodAllowance: '',
      employment_location: data.employment_location,
      employment_country: data.employment_country,
      employment_city: data.employment_city,
      contract_duration: data.contract_duration,
      contract_type: data.contract_type,
      working_hours_day: data.working_hours_day,
      working_hours_week: data.working_hours_week,
      probation_period: data.probation_period,
      overtime: data.overtime,
      medical_insurance: data.medical_insurance,
      joining_ticket: data.joining_ticket,
      paid_leaves: data.paid_leaves,
      paid_leaves_duration: data.paid_leaves_duration,
      leave_ticket: data.leave_ticket,
      uniform: data.uniform,
      other_benefits: data.other_benefits,
      accomdationAllowance: '',
      transportationAllowance: ''
    };
    let newvar = Object.assign({}, newData);
    if (newData.accommodation != "Provided by company" && newData.accommodation != "Not provided by company") {
      newData.accomdationAllowance = newvar.accommodation;
      newData.accommodation = "Allowance";
      this.accomdation = "Allowance";
    }

    if (newData.transportation != "Provided by company" && newData.transportation != "Not provided by company") {
      newData.transportationAllowance = newvar.transportation;
      newData.transportation = "Allowance";
      this.transportation = "Allowance";
    }

    if (newData.food != "Provided by company" && newData.food != "Not provided by company") {
      newData.foodAllowance = newvar.transportation;
      newData.food = "Allowance";
      this.food = "Allowance";
    }

    this.benefitForm.setValue(newData);
  }

  setTerm(data) {
    if (this.modeInterview == "In person") {
      this.termForm.controls.no_of_delegates.setValidators(Validators.required);
      this.termForm.controls.no_of_delegates.updateValueAndValidity();

      this.termForm.controls.flights_for_delegates.setValidators(Validators.required);
      this.termForm.controls.flights_for_delegates.updateValueAndValidity();

      this.termForm.controls.hotels_for_delegates.setValidators(Validators.required);
      this.termForm.controls.hotels_for_delegates.updateValueAndValidity();
    } else {
      this.termForm.controls.no_of_delegates.clearValidators();
      this.termForm.controls.no_of_delegates.updateValueAndValidity();
      this.termForm.controls.flights_for_delegates.clearValidators();
      this.termForm.controls.flights_for_delegates.updateValueAndValidity();
      this.termForm.controls.hotels_for_delegates.clearValidators();
      this.termForm.controls.hotels_for_delegates.updateValueAndValidity();


    }
    const newData = {
      mode_of_interview: data.mode_of_interview,
      recruitment_fee: data.recruitment_fee,
      no_of_delegates: data.no_of_delegates,
      flights_for_delegates: data.flights_for_delegates,
      hotels_for_delegates: data.hotels_for_delegates,
    };
    this.termForm.setValue(newData);
  }

  showDetail(i) {
    this.isValidDetail[i] = !this.isValidDetail[i];
  }


  updateDemand(content) {
    const data = {
      id: this.demandId,
      form_step: 5,
      demand_type: Number(this.postDemand),
    };
    this.loader.startLoading();
    this.userService.createDemand(data).subscribe((result: any) => {
      if (result.payload.demand) {
        this.loader.stopLoading();
        this.setData(result);
        this.confirmMessage = result.message;
        this.open(content);
      }
    });
  }

  demandFirst(content) {
    this.titleSubmitted = true
    if (this.hireDemand == 'locally') {
      const data = {
        id: this.demandId,
        form_step: 1,
        hire_type: this.hireDemand,
      };
      this.loader.startLoading();
      this.userService.createDemand(data).subscribe((result: any) => {
        if (result.payload.demand) {
          this.setData(result);
          this.loader.stopLoading();
        }

        this.toastr.success(result.message, 'Update Demand');
        let nextTab = this.activeTab + 1;
        if (nextTab <= this.maxTab) {
          this.makeActive(nextTab);
        }
      });
    } else {
      this.mySelectForm.form.markAllAsTouched();
      if (this.mySelectForm.form.invalid) {
        this.error = 'Please fill valid details!';
        return false;
      } else {
        this.error = '';
        const data = {
          id: this.demandId,
          form_step: 1,
          hire_type: this.hireDemand,
          hire_country: this.selectedCity,
          title: this.demandTitle
        };
        this.loader.startLoading();
        this.userService.createDemand(data).subscribe((result: any) => {
          if (result.payload.demand) {
            this.loader.stopLoading();
            this.setData(result);
            this.updated_at = result.payload.demand.updated_at;
            this.toastr.success(result.message, 'Update Demand');
          }
          let nextTab = this.activeTab + 1;
          if (nextTab <= this.maxTab) {
            this.makeActive(nextTab);
          }
        });
      }
    }
  }

  get t() {
    return this.mySelectForm.form.controls;
  }

  checkDemand(event) {
    this.hire = event.target.value;
  }
  isActive() {
    if (this.hireDemand == 'overseas') {
      return true;
    } else {
      return false;
    }
  }

  setLocation() {
    let groupArr = [];
    for (let i = 0; i < this.demandCategory.length; i++) {
      this.getSubcategory(this.demandCategory[i].parent_category_id, i);
      this.isValidDetail[i] = false;
      groupArr.push(
        this.formBuilder.group({
          category_id: [
            this.demandCategory[i].category_id,
            [Validators.required]
          ],
          parent_category_id: [this.demandCategory[i].parent_category_id,
          [Validators.required]],
          quantity: [this.demandCategory[i].quantity, [Validators.required]],
          salary: [this.demandCategory[i].salary, [Validators.required]],
          gender: [this.demandCategory[i].gender, [Validators.required]],
          nationality: [
            this.demandCategory[i].nationality
          ],
          age_bracket: [this.demandCategory[i].age_bracket],
          qualification: [this.demandCategory[i].qualification],
          years_of_experience: [this.demandCategory[i].years_of_experience],
          driver_license: [this.demandCategory[i].driver_license],
          job_desc: [this.demandCategory[i].job_desc],
        })
      );
    }

    this.locationForm.setControl('location', this.formBuilder.array(groupArr));
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
      parent_category_id: [null, [Validators.required]],
      category_id: [null, [Validators.required]],
      quantity: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      nationality: [''],
    });
    arrayControl.push(newGroup);
  }
  removeItem(index) {
    const arrayControl = <FormArray>this.locationForm.controls['location'];
    arrayControl.removeAt(index);
  }
  setCurrency(event) {
    const targetcurrency = event.target.value;
    const currneny = this.countriesCode.filter((value) => {
      return value.currency.code == targetcurrency;
    })
    if (currneny[0].currency.symbol) {
      this.currency = currneny[0].currency.symbol;
    } else {
      this.currency = targetcurrency;
    }

  }
  setCurrencyByData(targetcurrency) {
    const currneny = this.countriesCode.filter((value) => {
      return value.currency.code == targetcurrency;
    })
    if (currneny.length) {
      this.currency = currneny[0].currency.symbol;
    }

  }

  get f() {
    return this.benefitForm.controls;
  }
  get l() {
    return this.locationForm.controls;
  }

  get m() {
    return this.termForm.controls;
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

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    const formdata = this.editForm.value;
    formdata.form_step = 1;

    this.loader.startLoading();
    this.userService.editProfile(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.message) {
        result.payload.user[
          'authToken'
        ] = this.loginService.getUserAccessToken();
        this.loginService.setLoginUserDetail(result.payload.user);
      }
      this.toastr.success(result.message, 'Update Demand');
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }

  reviewSubmit() {
    let nextTab = this.activeTab + 1;
    console.log(nextTab);
    if (nextTab <= this.maxTab) {
      this.makeActive(nextTab);
    }

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
      currency: this.locationForm.value.currency,
      demands: this.locationForm.value.location,
      form_step: 2,
      id: this.demandId,
    };
    this.userService.createDemand(data).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.demand) {
        this.setData(result);
        this.updated_at = result.payload.demand.updated_at;
      }
      this.toastr.success(result.message, 'Update Demand');
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }
  benfitSubmit() {
    this.submitted = true;
    if (this.benefitForm.invalid) {
      return;
    }
    const formdata = this.benefitForm.value;
    if (formdata.accommodation == "Allowance") {
      formdata.accommodation = formdata.accomdationAllowance;
    }
    if (formdata.transportation == "Allowance") {
      formdata.transportation = formdata.transportationAllowance;
    }
    if (formdata.food == "Allowance") {
      formdata.transportation = formdata.foodAllowance;
    }

    formdata.form_step = 3;
    formdata.id = this.demandId;
    this.loader.startLoading();
    this.userService.createDemand(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.demand) {
        this.setData(result);
        this.updated_at = result.payload.demand.updated_at;
      }
      this.toastr.success(result.message, 'Update Demand');
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }

  termSubmit() {
    this.termsubmitted = true;
    if (this.termForm.invalid) {
      return;
    }
    const formdata = this.termForm.value;
    formdata.form_step = 4;
    formdata.id = this.demandId;
    this.loader.startLoading();
    this.userService.createDemand(formdata).subscribe((result: any) => {
      this.loader.stopLoading();
      if (result.payload.demand) {
        this.setData(result);
        this.updated_at = result.payload.demand.updated_at;
      }
      this.toastr.success(result.message, 'Update Demand');
      let nextTab = this.activeTab + 1;
      if (nextTab <= this.maxTab) {
        this.makeActive(nextTab);
      }
    });
  }

  listDemands() {
    this.modalReference.close();
    this.router.navigate(['user/demandlist']);
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
  createDemand() {
    this.modalReference.close();
    this.router.navigate(['/user/demand']);
  }

  createDuplicateDemand() {
    this.loader.startLoading();
    const data = {
      id: this.demandId
    }
    this.userService.createCopyDemand(data).subscribe((result: any) => {
      this.loader.stopLoading();
      this.modalReference.close();
      if (result.payload.demand) {
        this.router.navigate(['/user/demand/' + result.payload.demand.id]);
        this.toastr.success("Denand created", 'Duplicate Demand');
      }
    })
  }
  getCategory(id) {
    const category = this.category.findIndex((value) => {
      return value.id == id;
    })

    return this.category[category].name;

  }

  getcountry(code) {
    const counrty = this.countries.findIndex((value) => {
      return value.code == code;
    })
    if (counrty > -1)
      return this.countries[counrty]["name"];

  }
}
