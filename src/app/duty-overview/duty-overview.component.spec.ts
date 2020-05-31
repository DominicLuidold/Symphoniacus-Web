import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyOverviewComponent } from './duty-overview.component';

describe('DutyOverviewComponent', () => {
  let component: DutyOverviewComponent;
  let fixture: ComponentFixture<DutyOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
