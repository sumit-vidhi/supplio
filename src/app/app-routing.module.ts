/**
 * Base routing module of the application.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Define the routes
const appRoutes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: '', redirectTo: '/auth/login/employer', pathMatch: 'full' },
  { path: '**', redirectTo: '/pages/404' }, //No route found
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
