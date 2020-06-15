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
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AgencyProfileComponent } from './agency-profile/agency-profile.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { AgencyDashboardComponent } from './agency-dashboard/agency-dashboard.component';
import { PricingComponent } from './pricing/pricing.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
@NgModule({
  declarations: [AgencyProfileComponent, demandViewComponent, demandListComponent, DemandComponent, AutocompleteComponent, EditProfileComponent, UserNavComponent, UserDashboardComponent, ChangePasswordComponent, EmployerDashboardComponent, AgencyDashboardComponent, PricingComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgOptionHighlightModule,
    NgSelectModule,
    NgxIntlTelInputModule,
    AutocompleteModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    SelectDropDownModule,
    JwSocialButtonsModule,
    NgxPaginationModule,
    ShareButtonsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [UserRoutingModule.providers]
})
export class UserModule { }
