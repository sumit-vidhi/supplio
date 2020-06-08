import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '@modules/user/services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoaderService } from '@core/services/loader-service';
import { JWTAuthService } from '@core/services/jwt-auth.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { APP_USER } from '@configs/app-settings.config';

import * as $ from 'jquery';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  public sendMessage: boolean;
  dashboardData: any;
  mmeFreeurlForm: FormGroup;
  submitted = false;
  formCard: FormGroup;
  modalReference: NgbModalRef;
  submittedForm: boolean = false;
  appData: any;
  @ViewChild('myDiv', { static: true }) myDiv: ElementRef<HTMLElement>;
  @ViewChild('myDiv2', { static: true }) myDiv2: ElementRef<HTMLElement>;
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService, public modalService: NgbModal, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'demo');
    this.appData = JSON.parse(window.localStorage[APP_USER]);
    if (this.appData.is_welcome == "0") {
      if (this.appData.role == 'Employer') {
        let el: HTMLElement = this.myDiv.nativeElement;
        el.click();
      } else {
        let el2: HTMLElement = this.myDiv2.nativeElement;
        el2.click();
      }
    }




  }

  open(content) {

    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'ticket-modal' });

  }
  editPage() {
    this.modalReference.close();
    this.router.navigate(["user/edit-profile"]);
  }
  editAgency() {
    this.modalReference.close();
    this.router.navigate(["user/agency-profile"]);
  }

}
