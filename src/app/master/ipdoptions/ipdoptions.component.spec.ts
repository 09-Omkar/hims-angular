import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdoptionsComponent } from './ipdoptions.component';

describe('IpdoptionsComponent', () => {
  let component: IpdoptionsComponent;
  let fixture: ComponentFixture<IpdoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpdoptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
