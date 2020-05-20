/**
 * @module SharedModule
 * @description
 * This is the shared module of the application.
 * It contain the application related dependencies that can be shared across the applications
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadMoreComponent } from '../../core/components/read-more/read-more.component';@NgModule({
  declarations: [ReadMoreComponent],
  imports: [
    CommonModule
  ],
  exports:[ReadMoreComponent]
})
export class SharedModule { }
