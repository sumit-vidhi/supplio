import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from '@core/gaurds/auth-guard.service';
import { UserService } from '@modules/user/services/user.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DemandComponent } from './demand/demand.component';
import { demandListComponent } from './demandlist/demandlist.component';
import { demandViewComponent } from './demandview/demandview.component';
import { AgencyProfileComponent } from './agency-profile/agency-profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProfileComponent } from './profile/profile.component'
const routes: Routes = [
  {
    path: 'edit-profile', component: EditProfileComponent,
    data: { title: 'My account' },
    canActivate: [AuthGuard]
  },
  {
    path: 'agency-profile', component: AgencyProfileComponent,
    data: { title: 'My account' },
    canActivate: [AuthGuard]
  },
  {
    path: '', component: UserDashboardComponent,
    data: { title: 'My Dashboard' },
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password', component: ChangePasswordComponent,
    data: { title: 'Change Password' },
    canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent,
    data: { title: 'View Profile' },
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id', component: ProfileComponent,
    data: { title: 'View Profile' },
    canActivate: [AuthGuard]
  },
  {
    path: 'demand', component: DemandComponent,
    data: { title: 'Demand' },
    canActivate: [AuthGuard]
  },
  {
    path: 'demand/:id', component: DemandComponent,
    data: { title: 'Edit Demand' },
    canActivate: [AuthGuard]
  },
  {
    path: 'demandview/:id', component: demandViewComponent,
    data: { title: 'View Demand' },
    canActivate: [AuthGuard]
  },
  {
    path: 'demandlist', component: demandListComponent,
    data: { title: 'Demand' },
    canActivate: [AuthGuard]
  },
  {
    path: 'pricing', component: PricingComponent,
    data: { title: 'Price Selection' },
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  static providers = [
    UserService
  ];
}
