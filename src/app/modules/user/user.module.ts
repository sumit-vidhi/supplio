import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { NgPaymentCardModule } from 'ng-payment-card';
@NgModule({
  declarations: [EditProfileComponent, UserNavComponent, UserDashboardComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CreditCardDirectivesModule,
    NgPaymentCardModule
  ],
  providers: [UserRoutingModule.providers]
})
export class UserModule { }
