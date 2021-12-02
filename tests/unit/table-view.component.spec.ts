import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewComponent } from '@modules/channels-navigation/components/table-view/table-view.component';
import { loadAppTest } from './test';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
