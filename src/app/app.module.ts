/**
 * Base module of the application
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Importing App Component
import { AppComponent } from '@app/app.component';

// Importing modules
import { CoreModule } from '@core/core.module';
import { BasicThemeModule } from '@modules/theme/basic-theme.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BasicThemeModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
