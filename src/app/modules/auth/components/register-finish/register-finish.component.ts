import { Component, OnInit } from '@angular/core';
import { 
  ActivatedRoute,
  Router, 
  ParamMap 
}                             from '@angular/router';
@Component({
  selector: 'app-register-finish',
  templateUrl: './register-finish.component.html',
  styleUrls: ['./register-finish.component.css']
})
export class RegisterFinishComponent implements OnInit {
page:any;
  constructor(
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.loadPage();   
  }
  loadPage(){
         this.page="user";
   }

}
