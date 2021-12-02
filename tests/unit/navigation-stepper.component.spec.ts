import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationStepperComponent } from '@modules/channels-navigation/components/navigation-stepper/navigation-stepper.component';
import { loadAppTest } from './test';

describe('NavigationStepperComponent', () => {
  let component: NavigationStepperComponent;
  let fixture: ComponentFixture<NavigationStepperComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
