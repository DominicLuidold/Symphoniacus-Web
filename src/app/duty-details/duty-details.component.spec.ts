import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyDetailsComponent } from './duty-details.component';

describe('DutyDetailsComponent', () => {
  let component: DutyDetailsComponent;
  let fixture: ComponentFixture<DutyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
