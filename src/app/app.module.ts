/**
 * Base module of the application
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importing App Component
import { AppComponent } from '@app/app.component';

// Importing modules
import { CoreModule } from '@core/core.module';
import { BasicThemeModule } from '@modules/theme/basic-theme.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BasicThemeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
