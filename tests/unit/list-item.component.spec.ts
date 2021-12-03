import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from '@modules/channels-navigation/components/list-item/list-item.component';
import { loadAppTest } from './test';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
