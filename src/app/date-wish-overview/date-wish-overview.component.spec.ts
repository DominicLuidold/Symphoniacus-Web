import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWishOverviewComponent } from './date-wish-overview.component';

describe('DateWishOverviewComponent', () => {
  let component: DateWishOverviewComponent;
  let fixture: ComponentFixture<DateWishOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateWishOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWishOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
