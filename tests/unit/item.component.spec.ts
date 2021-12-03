import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from '@modules/channels-navigation/components/item/item.component';
import { loadAppTest } from './test';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
