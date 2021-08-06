import { TestBed, async, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from '../../src/app/app.component';


const configureTestingModuleData = {
  'declarations': [ AppComponent ],
  'imports': [ RouterTestingModule ],
  'providers': [
    { 'provide': ComponentFixtureAutoDetect, 'useValue': true }
  ],
  'schemas': [ NO_ERRORS_SCHEMA ]
};


export const loadAppTest = () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(configureTestingModuleData).compileComponents();
  }));
};