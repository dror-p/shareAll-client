import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterRatingComponent } from './renter-rating.component';

describe('RenterRatingComponent', () => {
  let component: RenterRatingComponent;
  let fixture: ComponentFixture<RenterRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
