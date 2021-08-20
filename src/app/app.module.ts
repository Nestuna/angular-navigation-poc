import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMediaserverServiceService, MediaserverConfig } from 'angular-mediaserver-service';

class MediaserverConfigLocal {
  baseUrl = 'https://beta.ubicast.net';
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AngularMediaserverServiceService,
    { provide: MediaserverConfig, useClass: MediaserverConfigLocal }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
