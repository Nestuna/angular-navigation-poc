import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbItemComponent } from '@modules/channels-navigation/components/thumb-item/thumb-item.component';
import { loadAppTest } from './test';

describe('ThumbItemComponent', () => {
  let component: ThumbItemComponent;
  let fixture: ComponentFixture<ThumbItemComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
