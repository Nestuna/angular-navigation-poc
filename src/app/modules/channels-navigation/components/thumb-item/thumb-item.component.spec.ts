import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbItemComponent } from './thumb-item.component';

describe('ThumbItemComponent', () => {
  let component: ThumbItemComponent;
  let fixture: ComponentFixture<ThumbItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
