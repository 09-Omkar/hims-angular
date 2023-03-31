import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientregistrationComponent } from './patientregistration.component';

describe('PatientregistrationComponent', () => {
  let component: PatientregistrationComponent;
  let fixture: ComponentFixture<PatientregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientregistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
