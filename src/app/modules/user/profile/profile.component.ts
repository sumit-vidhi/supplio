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
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  appData: any;
  modalReference: NgbModalRef;
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
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  messageForm: FormGroup;
  submitted = false;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private loader: LoaderService, public loginService: JWTAuthService, public modalService: NgbModal) {
  }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      description: ['', Validators.required]
    });
    const appData = JSON.parse(window.localStorage[APP_USER]);
    if (appData.role == "Agency") {
      this.appData = appData;
      let data = [];
      if (this.appData) {
        for (let i = 0; i < this.appData.agency_company_tour.length; i++) {
          data[i] = {
            small: this.appData.agency_company_tour[i].filepath,
            medium: this.appData.agency_company_tour[i].filepath,
            big: this.appData.agency_company_tour[i].filepath,
            description: this.appData.agency_company_tour[i].filename
          }
        }

        this.galleryImages = data;
      }
    }
    if (appData.role == "Employer") {
      this.route.params.subscribe((params) => {
        this.loader.startLoading();
        this.userService.getProfiledata(params.id).subscribe((result: any) => {
          if (result.payload.agency) {
            this.loader.stopLoading();
            this.appData = result.payload.agency;
            let data = [];
            for (let i = 0; i < this.appData.agency_company_tour.length; i++) {
              data[i] = {
                small: this.appData.agency_company_tour[i].filepath,
                medium: this.appData.agency_company_tour[i].filepath,
                big: this.appData.agency_company_tour[i].filepath,
                description: this.appData.agency_company_tour[i].filename
              }
              console.log(data);
            }
            console.log(data);
            this.galleryImages = data;

          }
        });
      });
    }
    this.galleryOptions = [
      { "imageDescription": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];




  }

  messageOpen(data, template) {
    this.open(template);
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'ticket-modal',
    });
  }

  get f() { return this.messageForm.controls; }


  onSubmit(mode) {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    const formData = this.messageForm.value;
    this.loader.startLoading();
    // this.userService.addEmail(formData).subscribe((result) => {
    //   this.loader.stopLoading();
    //   if (result.status == 'success') {
    //     alert("Message sent to all users");
    //   } else {
    //     alert(result.message);
    //   }
    // })
  }
}
