import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { APP_USER } from '@configs/app-settings.config';
import * as $ from 'jquery';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
declare var paypal;
@Component({
  selector: 'app-demandview-dashboard',
  templateUrl: './demandview.component.html',
  styleUrls: ['./demandview.component.scss'],
})
export class demandViewComponent implements OnInit {
  public sendMessage: boolean;
  dashboardData: any;
  mmeFreeurlForm: FormGroup;
  submitted = false;
  formCard: FormGroup;
  modalReference: NgbModalRef;
  submittedForm: boolean = false;
  demandData: any = [];
  category: any;
  searchForm: FormGroup;
  showDetailData = [false];
  categoryData = [];
  countries = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    {
      name: 'Cote D Ivoire',
      code: 'CI',
    },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    {
      name: 'Korea, Democratic People S Republic of',
      code: 'KP',
    },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    {
      name: 'Lao People S Democratic Republic',
      code: 'LA',
    },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ];
  appData: any;
  demandDataValue: any = [];
  bidForm: FormGroup
  bidSubmitted = false;
  selectionTitle = "Comment";
  paymentSuccess = false;
  proposalData: any = [];
  agencyData: any = [];
  showSuccess = false;
  public payPalConfig?: IPayPalConfig;
  payPalConfigSubscription: IPayPalConfig;
  finalAmount: string = '1';
  bidAmount: any;
  pendingAmount: any;
  bidtotalAmount: any;
  plan: any = "";
  process = false;
  paymentMethod: any = "";
  @ViewChild('myDiv', { static: false }) myDiv: ElementRef<HTMLElement>;
  @ViewChild('paypaldiv', { static: true }) paypaldiv: ElementRef<HTMLElement>;
  planId: any;
  subcripId: any;
  basicAuth = 'Basic AVpPmq8qGICC4JBKLoN6SJp5fwkXiicz96B4-w30wrci06ShOIpSn0bWJsF8z6VowmojdjmFx2b_uHfWEICOP0zkMQ7K_vMs_VGqrb9eRmBTTFQ0VKSeQx92mz0auQwMz359WR2QbOMXQ1Gp3iRiZMqStvd_qm6p';  //Pass your ClientId + scret key
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService, public modalService: NgbModal) {
  }

  ngOnInit() {


    this.userService.getSubcategoies().subscribe((result: any) => {
      this.category = result.payload.categories;
    });
    this.bidForm = this.formBuilder.group({
      accept: [null, Validators.required],
      comments: [null, Validators.required]
    })
    this.appData = JSON.parse(window.localStorage[APP_USER]);
    this.appData.plan = this.plan = "";
    if (this.loginService.IsAuthUser() && this.appData.role == "Agency") {
      this.userService.getWallet().subscribe((result: any) => {

        result.payload.wallet = {
          "id": 1,
          "user_id": 50,
          "amount": "10",
          "created_at": "2020-06-25T16:54:12.000000Z",
          "updated_at": "2020-06-25T12:25:49.000000Z"
        }
        this.userService.wallet.next(result.payload.wallet);
        console.log(result.payload.wallet);
      });
    }


    this.route.params.subscribe((params) => {
      this.loader.startLoading();
      this.userService.getDemand(params.id).subscribe((result: any) => {
        if (result.payload.demand) {
          this.loader.stopLoading();
          this.demandDataValue = result.payload.demand;
          this.demandData = result.payload.demand[0];
          this.categoryData = this.demandDataValue.map((value, index) => {
            return value.demand_category.map((v, i) => {
              return v.category_name;
            });
          });
          if (this.appData.role == 'Agency') {
            if (this.demandDataValue[0].proposals.length) {

              this.proposalData = this.demandDataValue[0].proposals.filter((value, index) => {
                return value.user_id == this.loginService.getLoginUserId() && value.accept == "1";
              });
              if (this.proposalData[0].accept == 1) {
                this.proposalData[0].accept = "yes";
              }
              if (this.proposalData[0].accept == 0) {
                this.proposalData[0].accept = "no";
              }
              this.bidForm.patchValue({
                accept: this.proposalData[0].accept,
                comments: this.proposalData[0].comments
              })
            }
          }
          if (this.appData.role == 'Employer') {
            var data = this.demandData.proposals.map((data) => {
              return data.user;
            });
            var count = [];
            var countWork = [];
            for (let i = 0; i < data.length; i++) {
              data[i]["agencyId"] = this.demandData.proposals[i].id;
              count[i] = data[i].experience_industries_ids.length + data[i].experience_categories_ids.length;
              countWork[i] = data[i].agency_work.length;
              data[i]["count"] = count[i];
              data[i]["countWork"] = countWork[i];
            }
            this.agencyData = data;
          }
        }
      });
    });
    this.initConfig();

  }

  createSubscription() {
    const self = this;
    this.planId = 'P-5H884452VP862852NL33W5XQ';

    this.payPalConfigSubscription = {
      currency: 'EUR',
      clientId: 'AVpPmq8qGICC4JBKLoN6SJp5fwkXiicz96B4-w30wrci06ShOIpSn0bWJsF8z6VowmojdjmFx2b_uHfW',
      createSubscription: function (data, actions) {
        return actions.subscription.create({
          'plan_id': self.planId,
        });
      },
      onApprove: function (data, actions) {
        console.log(data);
        self.modalReference.close();
        self.myDiv.nativeElement.click();
        data["plan"] = this.planId;
        self.loader.startLoading();
        self.userService.addsubscription(data).subscribe((result: any) => {
          self.loader.stopLoading();
          result.payload.wallet = {
            "id": 1,
            "user_id": 50,
            "amount": "80",
            "created_at": "2020-06-25T16:54:12.000000Z",
            "updated_at": "2020-06-25T12:25:49.000000Z"
          }
          this.userService.wallet.next(result.payload.wallet);
        })
        // alert('You have successfully created subscription ' + data.subscriptionID);
        // self.getSubcriptionDetails(data.subscriptionID);
      },
      onCancel: function (data) {
        // Show a cancel page, or return to cart  
        console.log(data);
      },
      onError: function (err) {
        // Show an error page here, when an error occurs  
        console.log(err);
      }
    };
  }

  // ============Start Get Subcription Details Method============================  
  getSubcriptionDetails(subcriptionId) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(this.responseText));
        alert(JSON.stringify(this.responseText));
      }
    };
    xhttp.open('GET', 'https://api.sandbox.paypal.com/v1/billing/subscriptions/' + subcriptionId, true);
    xhttp.setRequestHeader('Authorization', this.basicAuth);

    xhttp.send();
  }


  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AVpPmq8qGICC4JBKLoN6SJp5fwkXiicz96B4-w30wrci06ShOIpSn0bWJsF8z6VowmojdjmFx2b_uHfW',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.finalAmount
            },

          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        this.modalReference.close();
        this.myDiv.nativeElement.click();
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        data["amount"] = this.finalAmount;
        this.loader.startLoading();
        this.userService.addWallet(data).subscribe((result: any) => {
          this.loader.stopLoading();
          result.payload.wallet = {
            "id": 1,
            "user_id": 50,
            "amount": "80",
            "created_at": "2020-06-25T16:54:12.000000Z",
            "updated_at": "2020-06-25T12:25:49.000000Z"
          }
          this.userService.wallet.next(result.payload.wallet);
        })
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }


  demandBid(content) {

    this.open(content);
  }

  get bid() {
    return this.bidForm.controls;
  }

  checkPlanAndWallet(content) {
    this.userService.wallet.subscribe((data) => {
      this.bidAmount = Number(data.amount);
    })
    let bidAmount = this.demandData.total_demands;
    if (bidAmount > 50) {
      bidAmount = 50;
    }
    this.pendingAmount = Number(bidAmount) - Number(this.bidAmount);
    this.bidtotalAmount = Number(bidAmount);
    this.finalAmount = this.pendingAmount;
    this.demandBid(content);

  }

  submitform(payMethod) {
    this.modalReference.close();
    this.process = true;
    this.paymentMethod = payMethod;
  }

  onBidFormSubmit(content) {
    const data = this.bidForm.value;
    if (!this.process && !this.paymentMethod && data.accept == "yes" && !this.plan) {
      this.checkPlanAndWallet(content);
      return;
    }

    this.bidSubmitted = true;
    if (this.bidForm.invalid) {
      return;
    }
    data.demand_id = this.demandData.id;
    if (data.accept == "yes") {
      data.accept = 1;
    } else {
      data.accept = 0;
    }
    this.loader.startLoading();
    this.userService.saveBid(data).subscribe((result: any) => {
      if (result.payload.proposal) {
        this.loader.stopLoading();
        alert("Bid Placed");
        this.ngOnInit();
      }
    })
  }
  checkQuest(event) {
    const selection = event.target.value;
    if (selection == "no") {
      this.selectionTitle = "Reason";
    } else {
      this.selectionTitle = "Comment";
    }
  }
  upgradePlan(content) {
    this.createSubscription();
    this.modalReference.close();
    this.open(content);
  }

  payment(template) {
    this.modalReference.close();
    this.open(template);
  }
  paymentGateway(template4) {
    this.paymentSuccess = true;
    this.modalReference.close();
    this.open(template4);
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'ticket-modal',
    });
  }

  showDetails(i) {
    console.log(i);
    this.showDetailData[i] = !this.showDetailData[i];
    console.log(this.showDetailData[i]);
  }

  getType() {
    if (this.demandData) {
      if (this.demandData.demand_type == 1) {
        return 'PSL';
      }
      if (this.demandData.demand_type == 2) {
        return 'Contest';
      }
    } else {
      return '-';
    }
  }
  getcountry(code) {
    const counrty = this.countries.findIndex((value) => {
      return value.code == code;
    });
    return this.countries[counrty]['name'];
  }

  getCategoryname(id) {
    const index = this.category.findIndex((data) => data.id == id);
    return this.category[index].name;
  }


}
