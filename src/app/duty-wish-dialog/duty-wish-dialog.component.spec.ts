import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyWishDialogComponent } from './duty-wish-dialog.component';

describe('DutyWishDialogComponent', () => {
  let component: DutyWishDialogComponent;
  let fixture: ComponentFixture<DutyWishDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyWishDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyWishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
