import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionsComponent } from './religions.component';

describe('ReligionsComponent', () => {
  let component: ReligionsComponent;
  let fixture: ComponentFixture<ReligionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReligionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReligionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
