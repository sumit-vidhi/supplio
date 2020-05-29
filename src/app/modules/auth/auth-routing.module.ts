/**
 * @module AuthRoutingModule
 * Auth routing module of the application.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importing components
import { MasterComponent } from '@modules/auth/components/master/master.component';
import { LoginComponent } from '@modules/auth/components/login/login.component';

// Importing services
import { AuthService } from '@modules/auth/services/auth.service';

// Importing guards
import { HasTokenResolver } from '@shared/resolvers/resolver.service';
import { SignUpComponent } from '@app/modules/auth/components/sign-up/sign-up.component';
import { ResetPasswordComponent } from '@app/modules/auth/components/reset-password/reset-password.component';
import { RegisterFinishComponent } from '@app/modules/auth/components/register-finish/register-finish.component';
import { EmailVarificationComponent } from '@app/modules/auth/components/email-varification/email-varification.component';
import { UpdatePasswordComponent } from '@app/modules/auth/components/update-password/update-password.component';

// defining routes
const routes: Routes = [
  {
    path: '', component: MasterComponent, children: [
      {
        path: 'login/:user',
        component: LoginComponent,
        data: { title: 'Login' }
      },
      {
        path: 'login/:user/:verified',
        component: LoginComponent,
        data: { title: 'Login' }
      },
      {
        path: 'signup/:user',
        component: SignUpComponent,
        data: { title: 'Sign Up' }
      },
      {
        path: 'thankyou',
        component: RegisterFinishComponent,
        data: { title: 'Thank You' }
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: { title: 'Reset Password' }
      },

      {
        path: 'email_verification/:id/:code',
        component: EmailVarificationComponent,
        data: { title: 'Verify Your Email Address' }
      },

      {
        path: 'reset/:id',
        component: UpdatePasswordComponent,
        data: { title: 'Forgot Password' }
      },
    ], resolve: { access: HasTokenResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    MasterComponent,
    RegisterFinishComponent,
    EmailVarificationComponent,
    UpdatePasswordComponent
  ];

  static providers = [
    AuthService,
    HasTokenResolver
  ];

}
