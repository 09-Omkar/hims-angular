import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdservicesComponent } from './ipdservices.component';

describe('IpdservicesComponent', () => {
  let component: IpdservicesComponent;
  let fixture: ComponentFixture<IpdservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdservicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpdservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
