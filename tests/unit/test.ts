import { TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularMediaserverService, MediaserverConfig } from 'angular-mediaserver-service';

import { AppComponent } from '../../src/app/app.component';

class MediaserverConfigLocal {
  baseUrl = 'https://beta.ubicast.net';
}

const configureTestingModuleData = {
  'declarations': [ AppComponent ],
  'imports': [ RouterTestingModule, HttpClientModule ],
  'providers': [
    AngularMediaserverService,
    { provide: MediaserverConfig, useClass: MediaserverConfigLocal },
    { 'provide': ComponentFixtureAutoDetect, 'useValue': true }
  ],
  'schemas': [ NO_ERRORS_SCHEMA ]
};


export const loadAppTest = () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(configureTestingModuleData).compileComponents();
  }));
};