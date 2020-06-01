import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateWishDialogComponent } from './date-wish-dialog.component';

describe('DateWishDialogComponent', () => {
  let component: DateWishDialogComponent;
  let fixture: ComponentFixture<DateWishDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateWishDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
