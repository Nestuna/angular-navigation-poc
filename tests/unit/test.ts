import {APP_BASE_HREF} from '@angular/common';
import { TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularMediaserverService, MediaserverConfig } from 'angular-mediaserver-service';

import { AppModule } from '../../src/app/app.module';
import { SharedModule } from '../../src/app/shared/shared.module';
import { ChannelsNavigationModule } from '../../src/app/modules/channels-navigation/channels-navigation.module';
import { CoreModule } from '../../src/app/core/core.module';

class MediaserverConfigLocal {
  baseUrl = 'https://beta.ubicast.net';
}

const configureTestingModuleData = {
  'declarations': [],
  'imports': [ RouterTestingModule, HttpClientModule, AppModule ],
  'providers': [
    AngularMediaserverService,
    { provide: MediaserverConfig, useClass: MediaserverConfigLocal },
    { provide: ComponentFixtureAutoDetect, useValue: true },
    { provide: APP_BASE_HREF, useValue : '/' }
  ],
  'schemas': [ NO_ERRORS_SCHEMA ]
};


export const loadAppTest = () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(configureTestingModuleData).compileComponents();
  }));
};