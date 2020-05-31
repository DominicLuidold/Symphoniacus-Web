import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWishDialogComponent } from './delete-wish-dialog.component';

describe('DeleteWishDialogComponent', () => {
  let component: DeleteWishDialogComponent;
  let fixture: ComponentFixture<DeleteWishDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWishDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
