/**
 * This is the theme module of the application, It contain the application theme related dependencies
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from '@theme/components/layout/header/header.component';
import { FooterComponent } from '@theme/components/layout/footer/footer.component';
import { LayoutComponent } from '@theme/components/layout/layout/layout.component';

const components = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [SharedModule, ...components]
})
export class BasicThemeModule { }
