import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationStepperComponent } from './navigation-stepper.component';

describe('NavigationStepperComponent', () => {
  let component: NavigationStepperComponent;
  let fixture: ComponentFixture<NavigationStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
