import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AutocompleteComponent } from './edit-profile/google-places.component';
import { demandListComponent } from './demandlist/demandlist.component';
import { demandViewComponent } from './demandview/demandview.component';
import { DemandComponent } from './demand/demand.component';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [demandViewComponent,demandListComponent,DemandComponent,AutocompleteComponent, EditProfileComponent, UserNavComponent, UserDashboardComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgOptionHighlightModule,
    NgSelectModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [UserRoutingModule.providers]
})
export class UserModule { }
