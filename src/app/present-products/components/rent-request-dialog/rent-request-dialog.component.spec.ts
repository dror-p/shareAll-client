import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRequestDialogComponent } from './rent-request-dialog.component';

describe('RentRequestDialogComponent', () => {
  let component: RentRequestDialogComponent;
  let fixture: ComponentFixture<RentRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
