import { 
  Component, 
  OnInit,
  Input 
}                       from '@angular/core';

import { 
  ActivatedRoute, 
  ParamMap 
}                       from '@angular/router';

import { AuthService } from '@modules/auth/services/auth.service';
import { LoaderService } from '@core/services/loader-service';

@Component({
  selector: 'app-email-varification',
  templateUrl: './email-varification.component.html',
  styleUrls: ['./email-varification.component.css']
})


export class EmailVarificationComponent implements OnInit {

  constructor (
    private route : ActivatedRoute,
    private authService:AuthService, private loader: LoaderService
  ){}

  isEmailConfirmed:boolean;
  alreadyactivate:boolean;
  
  ngOnInit() {
    this.isEmailConfirmed = false;
    this.loader.startLoading();
    this.route.params.subscribe(params => {
     this.authService.confirm({ 
        id : params.id, 
        token : params.code 
      })
      .subscribe(response => {
        this.loader.stopLoading();
        if(response.status == 'success'){

          if(response.message=='active'){
            this.isEmailConfirmed = true; 
          }
          if(response.message=='alreadyactivate'){
            this.alreadyactivate = true; 
          }
         
        }
      
      })
    })	
  }

}
