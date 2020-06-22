import { Component, OnInit } from '@angular/core';
import { APP_USER } from '@configs/app-settings.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  appData: any;
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
  constructor() { }

  ngOnInit() {
    this.appData = JSON.parse(window.localStorage[APP_USER]);
  }

}
