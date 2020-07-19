import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { APP_USER } from '@configs/app-settings.config';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  plan = [];
  @Input() page;
  basicAuth = 'Basic AVpPmq8qGICC4JBKLoN6SJp5fwkXiicz96B4-w30wrci06ShOIpSn0bWJsF8z6VowmojdjmFx2b_uHfWEICOP0zkMQ7K_vMs_VGqrb9eRmBTTFQ0VKSeQx92mz0auQwMz359WR2QbOMXQ1Gp3iRiZMqStvd_qm6p';  //Pass your ClientId + scret key
  planId: any;
  modalReference: NgbModalRef;
  payPalConfigSubscription: IPayPalConfig;
  appData: any;
  @ViewChild('myDiv', { static: false }) myDiv: ElementRef<HTMLElement>;
  @Output() setsubscription = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService, public modalService: NgbModal, private renderer: Renderer2) { }

  ngOnInit() {
    this.appData = JSON.parse(window.localStorage[APP_USER]);
    this.loader.startLoading();
    this.userService.getAllPlan().subscribe((result: any) => {
      this.loader.stopLoading();
      this.plan = Object.assign([], result);
      console.log(this.plan);
    });
  }
  createSubscription() {
    const self = this;
    //  this.planId = 'P-5H884452VP862852NL33W5XQ';

    this.payPalConfigSubscription = {
      currency: 'USD',
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
        data["package_id"] = self.planId;
        self.loader.startLoading();
        const id = self.appData.id;
        self.userService.addsubscription(data).subscribe((result: any) => {
          self.userService.getProfiledata(id).subscribe((resul: any) => {
            result.payload.user["authToken"] = this.appData.authToken;
            self.loginService.setLoginUserDetail(result.payload.agency);
            self.loader.stopLoading();
          })
        })
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

  setPlan(plan, template) {
    if (this.page == 'pricing') {
      this.setsubscription.emit(plan);
    } else {
      this.createSubscription();
      this.planId = plan;
      this.open(template);
    }

  }
  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'ticket-modal',
    });
  }

}
