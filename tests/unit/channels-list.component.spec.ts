import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsListComponent } from '@modules/channels-navigation/pages/channels-list/channels-list.component';
import { loadAppTest } from './test';

describe('ChannelsComponent', () => {
  let component: ChannelsListComponent;
  let fixture: ComponentFixture<ChannelsListComponent>;

  loadAppTest();

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
