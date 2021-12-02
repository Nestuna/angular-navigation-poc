import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '@core/components/header/header.component';
import { loadAppTest } from './test';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
