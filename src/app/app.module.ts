import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMediaserverService, MediaserverConfig } from 'angular-mediaserver-service';
import { UbicastAngularCommonModule, UbicastAngularCommonService } from 'ubicast-angular-common';

class MediaserverConfigLocal {
  baseUrl = 'https://beta.ubicast.net';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UbicastAngularCommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [
    AngularMediaserverService,
    UbicastAngularCommonService,
    { provide: MediaserverConfig, useClass: MediaserverConfigLocal }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
