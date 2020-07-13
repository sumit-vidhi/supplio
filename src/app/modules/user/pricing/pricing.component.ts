import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { APP_USER } from '@configs/app-settings.config';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  plan = [];
  @Output() setsubscription = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService, public modalService: NgbModal, private renderer: Renderer2) { }

  ngOnInit() {
    this.loader.startLoading();
    this.userService.getAllPlan().subscribe((result: any) => {
      this.loader.stopLoading();
      this.plan = Object.assign([], result);
      console.log(this.plan);
    });
  }

  setPlan(plan) {
    console.log(plan);
    this.setsubscription.emit(plan);
  }

}
