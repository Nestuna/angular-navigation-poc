import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  AngularMediaserverService,
  MediaserverConfig,
} from 'angular-mediaserver-service';
import {
  UbicastAngularCommonModule,
  UbicastAngularCommonService,
} from 'ubicast-angular-common';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material.module';
import { ChannelsNavigationModule } from './modules/channels-navigation/channels-navigation.module';

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
    HttpClientModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule,
    ChannelsNavigationModule,
  ],
  providers: [
    AngularMediaserverService,
    UbicastAngularCommonService,
    { provide: MediaserverConfig, useClass: MediaserverConfigLocal },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
