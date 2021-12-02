import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeaderComponent } from '@modules/channels-navigation/components/nav-header/nav-header.component';
import { loadAppTest } from './test';

describe('NavHeaderComponent', () => {
  let component: NavHeaderComponent;
  let fixture: ComponentFixture<NavHeaderComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
