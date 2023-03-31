import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorcatrgorywiseopdserviceratesComponent } from './doctorcatrgorywiseopdservicerates.component';

describe('DoctorcatrgorywiseopdserviceratesComponent', () => {
  let component: DoctorcatrgorywiseopdserviceratesComponent;
  let fixture: ComponentFixture<DoctorcatrgorywiseopdserviceratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorcatrgorywiseopdserviceratesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorcatrgorywiseopdserviceratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
