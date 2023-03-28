import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdservicesComponent } from './opdservices.component';

describe('OpdservicesComponent', () => {
  let component: OpdservicesComponent;
  let fixture: ComponentFixture<OpdservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdservicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpdservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
