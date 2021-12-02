import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleViewButtonComponent } from '@modules/channels-navigation/components/toggle-view-button/toggle-view-button.component';
import { loadAppTest } from './test';

describe('ToggleViewButtonComponent', () => {
  let component: ToggleViewButtonComponent;
  let fixture: ComponentFixture<ToggleViewButtonComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleViewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
