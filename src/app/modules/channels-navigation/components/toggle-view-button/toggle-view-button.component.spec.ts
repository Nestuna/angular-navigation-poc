import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleViewButtonComponent } from './toggle-view-button.component';

describe('ToggleViewButtonComponent', () => {
  let component: ToggleViewButtonComponent;
  let fixture: ComponentFixture<ToggleViewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleViewButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleViewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
